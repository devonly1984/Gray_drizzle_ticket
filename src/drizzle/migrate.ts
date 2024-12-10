import {db} from './index';
import {migrate} from "drizzle-orm/neon-http/migrator";
import * as Sentry from '@sentry/nextjs'

const main = async ()=>{
    try {
        await migrate(db, { migrationsFolder: "./src/drizzle/migrations" });
        console.log("Migrations completed");
    } catch (error) {
        console.error(error);
        Sentry.captureException(error)
        process.exit(1)
    }
}

main()