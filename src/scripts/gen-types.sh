#!/bin/bash

export $(grep -v '^#' .env.local | xargs)

npx supabase gen types --lang=typescript --project-id "$NEXT_PUBLIC_SUPABASE_PROJECT_REF" --schema public > src/types/database.types.ts
