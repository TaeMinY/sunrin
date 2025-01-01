import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
  } from '@nestjs/common';
  
  export class BoardTitlePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      console.log('value', value);
      console.log('metadata', metadata);
      if (value === undefined || value === '') {
        throw new BadRequestException('');
      }
      return value;
    }
  }
  