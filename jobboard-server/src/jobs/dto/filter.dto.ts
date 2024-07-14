import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum CategoryEnum {
  JAVA = 'java',
  PYTHON = 'python',
}

export enum LocationEnum {
  HYDERABAD = 'hyderabad',
  BANGALORE = 'bangalore',
}

export class FilterDto {
  @IsOptional()
  @IsEnum(SortEnum)
  @Transform(({ value }) => value?.toUpperCase())
  @ApiProperty({
    description: `sort order ascending or descending use "ASC" or "DESC"  `,
  })
  sort?: SortEnum;

  @IsOptional()
  @IsEnum(CategoryEnum)
  @Transform(({ value }) => value?.toLowerCase())
  @ApiProperty({
    description: 'CHOOSE A CATEGORY',
  })
  category?: CategoryEnum;

  @IsOptional()
  @IsEnum(LocationEnum)
  @Transform(({ value }) => value?.toLowerCase())
  @ApiProperty({
    description: 'location',
  })
  location?: LocationEnum;
}
