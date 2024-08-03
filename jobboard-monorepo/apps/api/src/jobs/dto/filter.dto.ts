/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
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
  @Transform(({ value }) => value?.toLowerCase())
  @ApiProperty({
    description: 'CHOOSE A CATEGORY',
  })
  category?: string;

  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  @ApiProperty({
    description: 'location',
  })
  location?: string;

  @IsOptional()
  @ApiProperty({
    description: 'skip items',
  })
  skip?: number;
  @IsOptional()
  @ApiProperty({
    description: 'total items',
  })
  take?: number;
}
