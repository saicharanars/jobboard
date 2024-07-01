import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719413025446 implements MigrationInterface {
    name = ' $npmConfigName1719413025446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_user" RENAME COLUMN "age" TO "mobile_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_user" RENAME COLUMN "mobile_number" TO "age"`);
    }

}
