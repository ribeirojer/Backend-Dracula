import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,

      default: 0,
    },
    numReviews: {
      type: Number,

      default: 0,
    },
    price: {
      type: Number,

      default: 0,
    },
    features: {
      type: {
        connectivity: {
          type: String,

          default: null,
        },
        impedance: {
          type: String,

          default: null,
        },
        frequencyResponse: {
          type: String,

          default: null,
        },
        sensitivity: {
          type: String,

          default: null,
        },
        screen: {
          type: String,

          default: null,
        },
        processor: {
          type: String,

          default: null,
        },
        ram: {
          type: String,

          default: null,
        },
        storage: {
          type: String,

          default: null,
        },
        os: {
          type: String,

          default: null,
        },
        resolution: {
          type: String,

          default: null,
        },
        sensor: {
          type: String,

          default: null,
        },
        isoRange: {
          type: String,

          default: null,
        },
        videoResolution: {
          type: String,

          default: null,
        },
      },
      default: null,
    },
    salePercentage: {
      type: Number,

      default: 0,
    },
    isNewProduct: {
      type: Boolean,

      default: false,
    },
    stock: {
      type: Number,

      default: 0,
    },
    sold: {
      type: Number,

      default: 0,
    },
    dimensions: {
      length: {
        type: Number,

        default: 0,
      },
      width: {
        type: Number,

        default: 0,
      },
      height: {
        type: Number,

        default: 0,
      },
    },
    weight: {
      type: Number,

      default: 0,
    },
    ratingCount: {
      type: Number,

      default: 0,
    },
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export { Product };
