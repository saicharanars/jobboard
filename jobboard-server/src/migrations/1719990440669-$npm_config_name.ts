import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719990440669 implements MigrationInterface {
    name = ' $npmConfigName1719990440669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobbboard_jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job_role" character varying NOT NULL, "description" character varying(1200) NOT NULL, "openings" integer NOT NULL, "category" character varying NOT NULL, "location" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_77f66975671192277cb69db5f0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."job_user_role_enum" RENAME TO "job_user_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."job_user_role_enum" AS ENUM('job_candiatate', 'job_employer')`);
        await queryRunner.query(`ALTER TABLE "job_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "job_user" ALTER COLUMN "role" TYPE "public"."job_user_role_enum" USING "role"::"text"::"public"."job_user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "job_user" ALTER COLUMN "role" SET DEFAULT 'job_candiatate'`);
        await queryRunner.query(`DROP TYPE "public"."job_user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" ADD CONSTRAINT "FK_b8306397389c6ca9eadbb684c6d" FOREIGN KEY ("userId") REFERENCES "job_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" DROP CONSTRAINT "FK_b8306397389c6ca9eadbb684c6d"`);
        await queryRunner.query(`CREATE TYPE "public"."job_user_role_enum_old" AS ENUM('company', 'applicany')`);
        await queryRunner.query(`ALTER TABLE "job_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "job_user" ALTER COLUMN "role" TYPE "public"."job_user_role_enum_old" USING "role"::"text"::"public"."job_user_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "job_user" ALTER COLUMN "role" SET DEFAULT 'applicany'`);
        await queryRunner.query(`DROP TYPE "public"."job_user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."job_user_role_enum_old" RENAME TO "job_user_role_enum"`);
        await queryRunner.query(`DROP TABLE "jobbboard_jobs"`);
    }

}
