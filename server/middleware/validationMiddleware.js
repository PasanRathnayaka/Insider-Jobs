import { ExpressValidator } from "express-validator";

const { body } = new ExpressValidator();

export const signupValidator = [
    body("username")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3, max: 64 }).withMessage("Name must be at least 3 characters long")
        .trim()
        .escape(),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format. Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),

    body("role")
        .notEmpty().withMessage("User Role is required")
        .trim()
        .escape()
];

export const loginValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format. Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required"),
];
