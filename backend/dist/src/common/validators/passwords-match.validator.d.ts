import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class PasswordsMatchConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
