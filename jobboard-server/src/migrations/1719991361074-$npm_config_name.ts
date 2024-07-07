import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719991361074 implements MigrationInterface {
    name = ' $npmConfigName1719991361074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobbboard_jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "job_role" character varying NOT NULL, "description" character varying(1200) NOT NULL, "openings" integer NOT NULL, "category" character varying NOT NULL, "location" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_77f66975671192277cb69db5f0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "mobile_number" bigint, "password" character varying, "role" "public"."job_user_role_enum" NOT NULL DEFAULT 'job_candidate', CONSTRAINT "PK_13dd4ad96c9a725eadf48db7558" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" ADD CONSTRAINT "FK_b8306397389c6ca9eadbb684c6d" FOREIGN KEY ("userId") REFERENCES "job_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobbboard_jobs" DROP CONSTRAINT "FK_b8306397389c6ca9eadbb684c6d"`);
        await queryRunner.query(`DROP TABLE "job_user"`);
        await queryRunner.query(`DROP TABLE "jobbboard_jobs"`);
    }

}
