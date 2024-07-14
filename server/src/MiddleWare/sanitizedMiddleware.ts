import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  constructor() {
    this.use = this.use.bind(this); // Bind the use method to the class instance
  }

  use(req: Request, res: Response, next: NextFunction) {
    req.body = this.sanitize(req.body);
    req.query = this.sanitize(req.query);
    req.params = this.sanitize(req.params);
    next();
  }

  sanitize(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const sanitizedObj: any = {};

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        sanitizedObj[key] = this.sanitizeInput(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizedObj[key] = this.sanitize(obj[key]);
      } else {
        sanitizedObj[key] = obj[key];
      }
    });

    return sanitizedObj;
  }

  sanitizeInput(input: string): string {
    const specialCharacters = [
      '<',
      '>',
      '&',
      '"',
      "'",
      '/',
      '\\',
      '=',
      '(',
      ')',
      '{',
      '}',
      ';',
      '--',
      '#',
      '/*',
      '*/',
      '%',
      '+',
      '?',
      '\n',
      '\r',
      '\t',
      '\v',
      '\f',
    ];

    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }

    let sanitized = input;

    specialCharacters.forEach((char) => {
      const charPattern = new RegExp(
        char.replace(/[*+?^${}()|[\]\\]/g, '\\$&'),
        'g',
      );
      sanitized = sanitized.replace(charPattern, '');
    });

    return sanitized;
  }
}
