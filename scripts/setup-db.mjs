/**
 * Script to run schema.sql and seed.sql on Supabase
 * Usage: node scripts/setup-db.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    'Missing env vars. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

async function runSQL(filename) {
  const filepath = join(__dirname, '..', 'supabase', filename);
  const sql = readFileSync(filepath, 'utf-8');

  console.log(`\nRunning ${filename}...`);

  // Use the REST API to execute SQL via RPC
  // Since Supabase doesn't support raw SQL execution via client, we'll use fetch
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!response.ok) {
    // Try alternate approach - check if table exists
    console.log(`Note: Direct SQL execution not supported via REST API.`);
    console.log(`Please run the SQL manually in Supabase SQL Editor.`);
    return false;
  }

  console.log(`✓ ${filename} executed successfully`);
  return true;
}

async function checkTableExists() {
  console.log('\nChecking if games table exists...');

  const { data, error } = await supabase.from('games').select('id').limit(1);

  if (error) {
    if (error.message.includes('does not exist') || error.code === '42P01') {
      console.log('✗ Table "games" does not exist.');
      return false;
    }
    console.log('Error:', error.message);
    return false;
  }

  console.log('✓ Table "games" exists!');
  return true;
}

async function countGames() {
  const { count, error } = await supabase.from('games').select('*', { count: 'exact', head: true });

  if (error) {
    console.log('Error counting games:', error.message);
    return 0;
  }

  return count || 0;
}

async function main() {
  console.log('='.repeat(50));
  console.log('Supabase Database Setup Check');
  console.log('='.repeat(50));
  console.log(`URL: ${supabaseUrl}`);

  const exists = await checkTableExists();

  if (exists) {
    const count = await countGames();
    console.log(`\n✓ Found ${count} games in database.`);

    if (count === 0) {
      console.log('\n⚠ Table exists but is empty. Run seed.sql in Supabase SQL Editor.');
    } else {
      console.log('\n✓ Database is ready!');
    }
  } else {
    console.log('\n' + '='.repeat(50));
    console.log('ACTION REQUIRED:');
    console.log('='.repeat(50));
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Run the contents of supabase/schema.sql');
    console.log('5. Run the contents of supabase/seed.sql');
    console.log('='.repeat(50));
  }
}

main().catch(console.error);
