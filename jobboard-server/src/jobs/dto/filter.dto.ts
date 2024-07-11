import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

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
  sort?: SortEnum;

  @IsOptional()
  @IsEnum(CategoryEnum)
  @Transform(({ value }) => value?.toLowerCase())
  category?: CategoryEnum;

  @IsOptional()
  @IsEnum(LocationEnum)
  @Transform(({ value }) => value?.toLowerCase())
  location?: LocationEnum;
}
