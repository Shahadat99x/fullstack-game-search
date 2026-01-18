/**
 * Script to execute SQL on Supabase using the Postgres REST endpoint
 * This uses the service role key to bypass RLS
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env vars.');
  process.exit(1);
}

// Get project ref from URL
const projectRef = supabaseUrl.replace('https://', '').split('.')[0];

async function executeSqlViaManagementApi(sql) {
  // Use the Supabase Management API to execute SQL
  // Endpoint: POST /v1/projects/{ref}/database/query
  const mgmtEndpoint = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;

  const response = await fetch(mgmtEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  return await response.json();
}

async function main() {
  console.log('Executing SQL on Supabase...');
  console.log('Project:', projectRef);

  try {
    // Read schema.sql
    const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf-8');

    console.log('\n1. Running schema.sql...');
    await executeSqlViaManagementApi(schemaSql);
    console.log('✓ Schema created');

    // Read seed.sql
    const seedPath = join(__dirname, '..', 'supabase', 'seed.sql');
    const seedSql = readFileSync(seedPath, 'utf-8');

    console.log('\n2. Running seed.sql...');
    await executeSqlViaManagementApi(seedSql);
    console.log('✓ Data seeded');

    console.log('\n✓ Database setup complete!');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    console.log('\nThe Management API requires an access token from Supabase dashboard.');
    console.log('Please run the SQL manually:');
    console.log('1. Go to https://supabase.com/dashboard/project/' + projectRef + '/sql');
    console.log('2. Paste and run supabase/schema.sql');
    console.log('3. Paste and run supabase/seed.sql');
  }
}

main();
