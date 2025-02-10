export default class Product {
    private title: string;
    private thumbnail: string;
    private stock: number;
    private price: number;
    private discountPercentage: number;
    private discountedPrice: number;
    private category: string;
    private rating: number;
  
    constructor({
      title,
      thumbnail,
      stock,
      price,
      discountPercentage,
      category,
      rating,
    }: {
      title: string;
      thumbnail: string;
      stock: number;
      price: number;
      discountPercentage: number;
      category: string;
      rating: number;
    }) {
      this.title = title;
      this.thumbnail = thumbnail;
      this.stock = stock;
      this.price = price;
      this.discountPercentage = discountPercentage;
      this.category = category;
      this.rating = rating;
      this.discountedPrice = this.calculateDiscountedPrice();
    }
  
    private calculateDiscountedPrice(): number {
      return (
        Math.round(
          (this.price - this.price * (this.discountPercentage * 0.01)) * 100
        ) / 100
      );
    }
  
   
    getTitle(): string {
      return this.title;
    }
    getThumbnailURL(): string {
      return this.thumbnail;
    }
    getStock(): number {
      return this.stock;
    }
    getCategory(): string {
      return this.category;
    }
    getRating(): number {
      return this.rating;
    }
    getDiscountedPrice(): number {
      return this.discountedPrice;
    }
  
    updateStock(): void {
      if (this.stock > 0) this.stock--;
    }
  }
  