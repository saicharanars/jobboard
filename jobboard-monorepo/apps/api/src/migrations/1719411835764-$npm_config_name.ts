import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719411835764 implements MigrationInterface {
    name = ' $npmConfigName1719411835764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "job_user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_13dd4ad96c9a725eadf48db7558" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "job_user"`);
    }

}
