### 1. 🔒 Encapsulation:
Encapsulation restricts direct access to internal state and logic. In TypeScript, this is enforced via access modifiers and module boundaries.

```ts
class Cart {
  private items: Map<string, number> = new Map();
  public readonly currency: string;

  constructor(currency: string) {
    this.currency = currency;
  }

  public addItem(id: string, qty: number): void {
    if (qty <= 0) throw new Error("Invalid quantity");
    this.items.set(id, (this.items.get(id) || 0) + qty);
  }

  public getTotal(): number {
    // Complex pricing logic hidden from consumers
    return [...this.items.entries()].reduce(/*...*/);
  }
}
```
**Large-scale benefit:** Teams can refactor internals without breaking the code . State mutations are centralized, making debugging and testing predictable.

### 2. 🎭 Abstraction:
Abstraction exposes only essential features while hiding complexity. TypeScript uses `interface`, `abstract class`, and type aliases to define contracts.

```ts
interface PaymentProcessor {
  process(amount: number): Promise<PaymentResult>;
}

class StripeProcessor implements PaymentProcessor { /*...*/ }
class PayPalProcessor implements PaymentProcessor { /*...*/ }
```
**Large-scale benefit:** Business logic depends on abstractions, not implementations. You can swap payment providers, caching layers

### 3. 🧬 Inheritance:
Inheritance establishes an `is-a` relationship and enables code reuse via `extends`.

```ts
abstract class Repository<T> {
  protected abstract db: DatabaseConnection;

  public async findById(id: string): Promise<T | null> {
    return this.db.query<T>(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }
}

class UserRepository extends Repository<User> { /*...*/ }
```
**Large-scale benefit:** Reduces duplication for shared CRUD, logging, or validation logic.  

### 4. 🔄 Polymorphism:
Polymorphism lets different types respond to the same method call in their own way. TypeScript enables this through interfaces, method overrides, and union types.

```ts
function notifyUsers(processor: PaymentProcessor, users: User[]) {
  users.forEach(user => {
    if (user.preferences.notifications === "email") {
      sendEmail(user, processor.process);
    } else {
      sendPush(user, processor.process);
    }
  });
}
```
**Large-scale benefit:** Enables plugin architectures, dependency injection, and strategy patterns. Code becomes open for extension but closed for modification (Open/Closed Principle).

---



## ✅ Takeaways for Production TypeScript

1. **Ban `any` in new code.** Use `unknown` + type guards for external data.
2. **Type narrow early.** Validate at boundaries (API handlers, event listeners, config loaders).
3. **Design with interfaces first.** Let implementations come later.
4. **Encapsulate aggressively.** Expose only what consumers need.
5. **Prefer composition over inheritance.** Use `implements` and DI for flexibility.
6. **Enable `strict: true` in `tsconfig.json`.** Let the compiler catch architectural drift.

TypeScript doesn’t just add types to JavaScript. It adds **discipline**. And in large-scale projects, discipline is what separates maintainable systems from legacy spaghetti.
