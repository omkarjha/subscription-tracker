import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        unique: true,
        trim: true,
        minlength: [3, "Subscription name must be at least 3 characters long"],
        maxlength: [50, "Subscription name must be at most 50 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [1, "Subscription price must be at least 1"],
    },
    currency: {
        type: String,
        required: [true, "Subscription currency is required"],
        trim: true,
        uppercase: true,
        enum: ['USD', 'EUR', 'INR', 'JPY', 'GBP'],
        default: 'INR',
    },
    frequency: {
        type: String,
        required: [true, "Subscription frequency is required"],
        trim: true,
        lowercase: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        required: [true, "Subscription category is required"],
        trim: true,
        lowercase: true,
        enum: ['utilities', 'food', 'transport', 'entertainment', 'education', 'health', 'other'],
        default: 'other',
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
        lowercase: true,
        enum: ['credit card', 'debit card', 'net banking', 'upi', 'wallet', 'cash'],
        default: 'credit card',
    },
    status: {
        type: String,
        required: [true, "Subscription status is required"],
        trim: true,
        lowercase: true,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Subscription start date cannot be in the future",
        },
    },
    renewalDate: {
        type: Date,
        required: false, // It will be auto-set if not provided
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true,
    }
}, { timestamps: true });


// ✅ Pre-Validation Hook to Auto-Set `renewalDate`
SubscriptionSchema.pre("validate", function (next) {
    console.log("Running Pre-Validate Hook...");

    if (!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);

        console.log("Auto-Generated Renewal Date:", this.renewalDate);
    }

    next();
});


const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
