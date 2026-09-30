export const LESSONS = [
  {
    id: 'hello-php',
    chapter: 'Start Here',
    title: 'Hello PHP',
    concept: 'PHP is a server-side language that outputs HTML, text, JSON, or files before the browser receives the response. This playground simulates common PHP examples in the browser so you can learn syntax and flow without installing PHP.',
    code: `<?php
echo "Hello, PHP!";
?>`,
    challenge: {
      question: 'Where does PHP normally run?',
      options: ['On a server before the page reaches the browser', 'Only inside CSS files', 'Only inside the browser DOM', 'Only in SQL databases'],
      correct: 0,
    },
  },
  {
    id: 'php-tags',
    chapter: 'Start Here',
    title: 'PHP Tags and Syntax',
    concept: 'PHP code is written between `<?php` and `?>` tags. Statements usually end with semicolons. HTML can surround PHP in real template files.',
    code: `<h1>Profile</h1>
<?php
echo "Rendered by PHP";
?>`,
  },
  {
    id: 'comments',
    chapter: 'Start Here',
    title: 'Comments',
    concept: 'PHP supports single-line comments with `//` or `#`, and block comments with `/* ... */`. Comments explain intent and are ignored by the interpreter.',
    code: `<?php
// Single-line comment
# Another single-line comment
/* A block comment
   can span lines */
echo "Comments do not print";
?>`,
  },
  {
    id: 'variables',
    chapter: 'Variables and Output',
    title: 'Variables',
    concept: 'PHP variables start with `$`. They are dynamically typed, so a variable can hold a string, number, boolean, array, or object depending on the value assigned.',
    code: `<?php
$name = "Maya";
$language = "PHP";
echo "$name is learning $language.";
?>`,
    challenge: {
      question: 'Which symbol starts a PHP variable?',
      options: ['$', '#', '@', '&'],
      correct: 0,
    },
  },
  {
    id: 'echo-print',
    chapter: 'Variables and Output',
    title: 'Echo and Print',
    concept: '`echo` and `print` output text. `echo` is commonly used and can output multiple values. `print` returns 1, which is rarely needed in beginner code.',
    code: `<?php
echo "First line\\n";
print "Second line";
?>`,
  },
  {
    id: 'data-types',
    chapter: 'Variables and Output',
    title: 'Data Types',
    concept: 'PHP common data types include string, integer, float, boolean, array, object, null, and resource. `var_dump()` shows a value and its type.',
    code: `<?php
$title = "Invoice";
$total = 125.50;
$paid = true;
$items = ["Design", "Development"];

var_dump($title);
var_dump($total);
var_dump($paid);
var_dump($items);
?>`,
  },
  {
    id: 'strings',
    chapter: 'Strings and Numbers',
    title: 'Strings',
    concept: 'Strings hold text. Double-quoted strings can interpolate variables. Single-quoted strings are more literal. Concatenate strings with `.`.',
    code: `<?php
$first = "Ada";
$last = "Lovelace";
echo "Hello, $first\\n";
echo $first . " " . $last;
?>`,
  },
  {
    id: 'string-functions',
    chapter: 'Strings and Numbers',
    title: 'String Functions',
    concept: 'PHP includes many built-in string helpers such as `strlen()`, `str_word_count()`, `strtoupper()`, `strtolower()`, `trim()`, and `str_replace()`.',
    code: `<?php
$message = "  Learn PHP online  ";
echo strlen($message) . "\\n";
echo strtoupper(trim($message)) . "\\n";
echo str_replace("PHP", "server code", $message);
?>`,
  },
  {
    id: 'numbers-math',
    chapter: 'Strings and Numbers',
    title: 'Numbers and Math',
    concept: 'PHP supports integers and floats. Arithmetic operators calculate values, and math functions like `round()`, `ceil()`, `floor()`, `min()`, and `max()` help format results.',
    code: `<?php
$subtotal = 49.99;
$tax = $subtotal * 0.18;
$total = $subtotal + $tax;
echo "Total: " . round($total, 2);
?>`,
  },
  {
    id: 'casting',
    chapter: 'Strings and Numbers',
    title: 'Casting',
    concept: 'Casting converts a value to another type. Common casts include `(int)`, `(float)`, `(string)`, `(bool)`, and `(array)`.',
    code: `<?php
$input = "42";
$quantity = (int) $input;
echo $quantity + 8;
?>`,
  },
  {
    id: 'constants',
    chapter: 'Logic',
    title: 'Constants',
    concept: 'Constants store values that should not change. Use `define()` or `const`. Constants do not start with `$`.',
    code: `<?php
define("SITE_NAME", "webdevpuneet.com");
const TAX_RATE = 0.18;

echo SITE_NAME . "\\n";
echo TAX_RATE;
?>`,
  },
  {
    id: 'operators',
    chapter: 'Logic',
    title: 'Operators',
    concept: 'PHP operators cover arithmetic, assignment, comparison, logical checks, string concatenation, null coalescing, and more.',
    code: `<?php
$price = 100;
$discount = 20;
$member = true;

echo $price - $discount . "\\n";
echo ($price > 50 && $member) ? "Discount allowed" : "No discount";
?>`,
  },
  {
    id: 'if-else',
    chapter: 'Logic',
    title: 'If Else',
    concept: '`if`, `elseif`, and `else` run different code branches based on conditions.',
    code: `<?php
$score = 82;

if ($score >= 90) {
  echo "A";
} elseif ($score >= 75) {
  echo "B";
} else {
  echo "Keep practicing";
}
?>`,
    challenge: {
      question: 'Which PHP keyword checks another condition after if?',
      options: ['elseif', 'elif', 'nextif', 'otherwise'],
      correct: 0,
    },
  },
  {
    id: 'switch-match',
    chapter: 'Logic',
    title: 'Switch and Match',
    concept: '`switch` compares one value against cases. Modern PHP also has `match`, an expression that returns a value and uses strict comparison.',
    code: `<?php
$role = "editor";

switch ($role) {
  case "admin":
    echo "Full access";
    break;
  case "editor":
    echo "Can edit content";
    break;
  default:
    echo "Read only";
}
?>`,
  },
  {
    id: 'while-loop',
    chapter: 'Loops',
    title: 'While Loop',
    concept: '`while` repeats as long as a condition is true. Always update something inside the loop so it eventually stops.',
    code: `<?php
$count = 1;
while ($count <= 3) {
  echo "Item $count\\n";
  $count++;
}
?>`,
  },
  {
    id: 'for-loop',
    chapter: 'Loops',
    title: 'For Loop',
    concept: '`for` is useful when you know the start, stop, and step values. It keeps loop setup in one line.',
    code: `<?php
for ($i = 1; $i <= 5; $i++) {
  echo $i . "\\n";
}
?>`,
  },
  {
    id: 'foreach-loop',
    chapter: 'Loops',
    title: 'Foreach Loop',
    concept: '`foreach` loops over arrays. Use it for lists and associative arrays.',
    code: `<?php
$skills = ["HTML", "CSS", "PHP"];

foreach ($skills as $skill) {
  echo "Learn $skill\\n";
}
?>`,
    challenge: {
      question: 'Which loop is usually best for arrays?',
      options: ['foreach', 'repeat', 'scan', 'eachwhile'],
      correct: 0,
    },
  },
  {
    id: 'functions',
    chapter: 'Functions',
    title: 'Functions',
    concept: 'Functions group reusable logic. Parameters accept input, and `return` sends a value back to the caller.',
    code: `<?php
function formatPrice($amount) {
  return "$" . number_format($amount, 2);
}

echo formatPrice(49.9);
?>`,
  },
  {
    id: 'typed-functions',
    chapter: 'Functions',
    title: 'Typed Functions',
    concept: 'Modern PHP supports parameter and return types. Types make function contracts clearer and catch mistakes earlier.',
    code: `<?php
function addTax(float $amount, float $rate): float {
  return $amount + ($amount * $rate);
}

echo addTax(100, 0.18);
?>`,
  },
  {
    id: 'anonymous-arrow',
    chapter: 'Functions',
    title: 'Anonymous and Arrow Functions',
    concept: 'Anonymous functions can be stored in variables. Arrow functions are shorter for simple expressions and automatically capture outside variables.',
    code: `<?php
$taxRate = 0.18;
$withTax = fn($amount) => $amount + ($amount * $taxRate);

echo $withTax(200);
?>`,
  },
  {
    id: 'indexed-arrays',
    chapter: 'Arrays',
    title: 'Indexed Arrays',
    concept: 'Indexed arrays store ordered lists. Access items by numeric index starting at 0.',
    code: `<?php
$colors = ["red", "green", "blue"];
echo $colors[0] . "\\n";
echo count($colors);
?>`,
  },
  {
    id: 'associative-arrays',
    chapter: 'Arrays',
    title: 'Associative Arrays',
    concept: 'Associative arrays use named keys. They are common for records, request data, and configuration.',
    code: `<?php
$user = [
  "name" => "Maya",
  "role" => "admin"
];

echo $user["name"] . " is " . $user["role"];
?>`,
  },
  {
    id: 'array-functions',
    chapter: 'Arrays',
    title: 'Array Functions',
    concept: 'PHP array helpers include `array_map()`, `array_filter()`, `array_reduce()`, `sort()`, `in_array()`, and `array_column()`.',
    code: `<?php
$prices = [10, 25, 40];
$withTax = array_map(fn($p) => $p * 1.18, $prices);

foreach ($withTax as $price) {
  echo round($price, 2) . "\\n";
}
?>`,
  },
  {
    id: 'superglobals',
    chapter: 'Forms and Requests',
    title: 'Superglobals',
    concept: 'Superglobals like `$_GET`, `$_POST`, `$_SERVER`, `$_SESSION`, and `$_COOKIE` are available everywhere. They represent request, session, and environment data.',
    code: `<?php
$_GET["name"] = "Maya";
echo "Hello " . $_GET["name"];
?>`,
  },
  {
    id: 'forms-get-post',
    chapter: 'Forms and Requests',
    title: 'GET and POST',
    concept: '`GET` is commonly used for query/filter data visible in the URL. `POST` is commonly used for form submissions that change data.',
    code: `<?php
$_POST["email"] = "maya@example.com";

if (!empty($_POST["email"])) {
  echo "Received: " . $_POST["email"];
}
?>`,
  },
  {
    id: 'validation',
    chapter: 'Forms and Requests',
    title: 'Form Validation',
    concept: 'Never trust user input. Validate required fields, expected formats, lengths, allowed values, and numeric ranges before using data.',
    code: `<?php
$email = "maya@example.com";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo "Valid email";
} else {
  echo "Invalid email";
}
?>`,
    challenge: {
      question: 'Why validate form input?',
      options: ['Because users and bots can send unexpected data', 'Because PHP cannot output strings', 'Because arrays require validation', 'Because echo needs it'],
      correct: 0,
    },
  },
  {
    id: 'sanitization',
    chapter: 'Forms and Requests',
    title: 'Sanitization',
    concept: 'Sanitization cleans data for safe display or storage. For HTML output, escape user text with `htmlspecialchars()`.',
    code: `<?php
$name = "<script>alert(1)</script>";
echo htmlspecialchars($name, ENT_QUOTES, "UTF-8");
?>`,
  },
  {
    id: 'dates',
    chapter: 'Files and State',
    title: 'Date and Time',
    concept: 'PHP date helpers format timestamps. `DateTime` is better for real date logic, time zones, and calculations.',
    code: `<?php
$now = new DateTime("2026-05-27");
echo $now->format("Y-m-d") . "\\n";
echo $now->modify("+7 days")->format("Y-m-d");
?>`,
  },
  {
    id: 'file-read-write',
    chapter: 'Files and State',
    title: 'Files',
    concept: 'PHP can read and write files with functions like `file_get_contents()` and `file_put_contents()`. Always validate paths and permissions in real apps.',
    code: `<?php
file_put_contents("notes.txt", "Learn PHP files");
echo file_get_contents("notes.txt");
?>`,
  },
  {
    id: 'cookies-sessions',
    chapter: 'Files and State',
    title: 'Cookies and Sessions',
    concept: 'Cookies store small values in the browser. Sessions store user-specific data on the server and keep a session id in the browser. Real session code should call `session_start()` before reading or writing `$_SESSION`.',
    code: `<?php
session_start();
setcookie("theme", "dark");
$_SESSION["user_id"] = 42;

echo "Theme cookie set\\n";
echo "Session user: " . $_SESSION["user_id"];
?>`,
  },
  {
    id: 'filters',
    chapter: 'Data and Errors',
    title: 'Filters',
    concept: 'PHP filters validate or sanitize common data such as emails, URLs, integers, floats, and IP addresses.',
    code: `<?php
$url = "https://webdevpuneet.com";

if (filter_var($url, FILTER_VALIDATE_URL)) {
  echo "Valid URL";
}
?>`,
  },
  {
    id: 'json',
    chapter: 'Data and Errors',
    title: 'JSON',
    concept: '`json_encode()` converts PHP arrays/objects to JSON. `json_decode()` converts JSON into PHP values. APIs use this constantly.',
    code: `<?php
$user = ["name" => "Maya", "role" => "admin"];
$json = json_encode($user);
echo $json . "\\n";

$decoded = json_decode($json, true);
echo $decoded["role"];
?>`,
  },
  {
    id: 'exceptions',
    chapter: 'Data and Errors',
    title: 'Exceptions',
    concept: 'Exceptions represent failures that normal return values cannot handle cleanly. Use `try`, `catch`, and `finally` for controlled error handling.',
    code: `<?php
try {
  throw new Exception("Payment failed");
} catch (Exception $e) {
  echo $e->getMessage();
}
?>`,
  },
  {
    id: 'classes-objects',
    chapter: 'Object-Oriented PHP',
    title: 'Classes and Objects',
    concept: 'Classes define reusable object shapes. Objects hold state in properties and behavior in methods.',
    code: `<?php
class Invoice {
  public string $client;

  public function __construct(string $client) {
    $this->client = $client;
  }

  public function label(): string {
    return "Invoice for " . $this->client;
  }
}

$invoice = new Invoice("Acme");
echo $invoice->label();
?>`,
  },
  {
    id: 'inheritance',
    chapter: 'Object-Oriented PHP',
    title: 'Inheritance',
    concept: 'Inheritance lets one class extend another. Use it carefully; composition is often simpler for business logic.',
    code: `<?php
class User {
  public function role(): string {
    return "member";
  }
}

class Admin extends User {
  public function role(): string {
    return "admin";
  }
}

$user = new Admin();
echo $user->role();
?>`,
  },
  {
    id: 'interfaces-traits',
    chapter: 'Object-Oriented PHP',
    title: 'Interfaces and Traits',
    concept: 'Interfaces define required methods. Traits share method implementations between classes without inheritance.',
    code: `<?php
interface Exportable {
  public function export(): string;
}

trait HasCsvHeader {
  public function header(): string {
    return "name,email";
  }
}

class Report implements Exportable {
  use HasCsvHeader;
  public function export(): string {
    return $this->header();
  }
}

echo (new Report())->export();
?>`,
  },
  {
    id: 'namespaces',
    chapter: 'Object-Oriented PHP',
    title: 'Namespaces',
    concept: 'Namespaces organize classes and prevent naming collisions. Composer autoloading maps namespaces to files in modern PHP projects.',
    code: `<?php
namespace App\\Billing;

class InvoiceNumber {
  public function next(): string {
    return "INV-1001";
  }
}

echo (new InvoiceNumber())->next();
?>`,
  },
  {
    id: 'iterables',
    chapter: 'Advanced PHP',
    title: 'Iterables',
    concept: 'Iterable values can be looped with `foreach`. Arrays and objects implementing Traversable are iterable. Generators produce iterable sequences lazily.',
    code: `<?php
function numbers(): iterable {
  yield 1;
  yield 2;
  yield 3;
}

foreach (numbers() as $number) {
  echo $number . "\\n";
}
?>`,
  },
  {
    id: 'pdo-mysql',
    chapter: 'Advanced PHP',
    title: 'PDO and MySQL',
    concept: 'PHP commonly talks to databases with PDO. Use prepared statements to avoid SQL injection. This playground simulates the query flow.',
    code: `<?php
$pdo = new PDO("mysql:host=localhost;dbname=app", "user", "secret");
$email = "maya@example.com";

$stmt = $pdo->prepare(
  "SELECT id, name, email FROM users WHERE email = ?"
);
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
  echo "Found user: " . $user["email"];
}
?>`,
    challenge: {
      question: 'Why use prepared statements?',
      options: ['To separate SQL from user input and reduce injection risk', 'To make echo faster', 'To avoid arrays', 'To disable sessions'],
      correct: 0,
    },
  },
  {
    id: 'regex',
    chapter: 'Advanced PHP',
    title: 'Regular Expressions',
    concept: 'PHP regex functions such as `preg_match()` and `preg_replace()` validate and transform text with patterns.',
    code: `<?php
$slug = "learn-php-online";

if (preg_match("/^[a-z0-9-]+$/", $slug)) {
  echo "Valid slug";
}
?>`,
  },
  {
    id: 'ajax-api',
    chapter: 'Advanced PHP',
    title: 'AJAX and API Response',
    concept: 'PHP often powers endpoints that return JSON to JavaScript. Set the response content type and echo encoded data.',
    code: `<?php
header("Content-Type: application/json");

$response = [
  "ok" => true,
  "message" => "Saved"
];

echo json_encode($response);
?>`,
  },
  {
    id: 'composer-security',
    chapter: 'Advanced PHP',
    title: 'Composer and Security',
    concept: 'Composer manages PHP packages. Real apps should keep dependencies updated, escape output, validate input, protect secrets, and use prepared SQL statements.',
    code: `<?php
require __DIR__ . "/vendor/autoload.php";

$dotenv = Dotenv\\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$_ENV["PAYMENT_API_KEY"] ??= "sk_test_example";
$apiKey = $_ENV["PAYMENT_API_KEY"] ?? null;

if (!$apiKey) {
  throw new RuntimeException("Missing PAYMENT_API_KEY");
}

echo "Dependencies loaded and secrets checked";
?>`,
  },
  {
    id: 'include-require',
    chapter: 'Pro PHP Foundations',
    title: 'Include and Require',
    concept: '`include` and `require` load another PHP file. `require` stops execution when the file is missing, so it is commonly used for required config, bootstrap, and shared layout files.',
    code: `<?php
require "config.php";
include "partials/header.php";

echo "Shared files loaded";
?>`,
  },
  {
    id: 'scope-static-global',
    chapter: 'Pro PHP Foundations',
    title: 'Scope, Static, and Global',
    concept: 'Variables inside functions have local scope. `global` reaches outside scope, but passing dependencies as parameters is usually cleaner. `static` keeps a local value between calls.',
    code: `<?php
function nextInvoiceNumber(): int {
  static $number = 1000;
  $number++;
  return $number;
}

echo nextInvoiceNumber() . "\\n";
echo nextInvoiceNumber();
?>`,
  },
  {
    id: 'strict-types',
    chapter: 'Pro PHP Foundations',
    title: 'Strict Types',
    concept: '`declare(strict_types=1)` makes scalar parameter and return types stricter for calls made from that file. It helps catch accidental string/number coercion in professional codebases.',
    code: `<?php
declare(strict_types=1);

function invoiceTotal(float $subtotal, float $tax): float {
  return $subtotal + $tax;
}

echo invoiceTotal(100.00, 18.00);
?>`,
  },
  {
    id: 'password-hashing',
    chapter: 'Security',
    title: 'Password Hashing',
    concept: 'Never store plain-text passwords. Use `password_hash()` when saving a password and `password_verify()` when checking a login attempt.',
    code: `<?php
$hash = password_hash("secret-password", PASSWORD_DEFAULT);

if (password_verify("secret-password", $hash)) {
  echo "Login allowed";
}
?>`,
    challenge: {
      question: 'What should be stored for a user password?',
      options: ['A password hash', 'The plain password', 'The browser cookie value', 'The login form HTML'],
      correct: 0,
    },
  },
  {
    id: 'csrf-protection',
    chapter: 'Security',
    title: 'CSRF Protection',
    concept: 'CSRF tokens protect state-changing forms from unwanted cross-site submissions. Generate a token, store it in the session, include it in the form, and verify it on submit.',
    code: `<?php
$_SESSION["csrf"] = bin2hex(random_bytes(16));
$_POST["csrf"] = $_SESSION["csrf"];

if (hash_equals($_SESSION["csrf"], $_POST["csrf"])) {
  echo "CSRF token valid";
}
?>`,
  },
  {
    id: 'file-uploads',
    chapter: 'Security',
    title: 'File Uploads',
    concept: 'File uploads need strict checks: upload errors, size limits, allowed MIME types, safe generated filenames, and storage outside executable public paths when possible.',
    code: `<?php
$allowed = ["image/png", "image/jpeg", "application/pdf"];
$mime = "image/png";
$size = 245000;

if (in_array($mime, $allowed, true) && $size < 1000000) {
  echo "Upload accepted";
}
?>`,
  },
  {
    id: 'abstract-final-static',
    chapter: 'Advanced OOP',
    title: 'Abstract, Final, and Static',
    concept: 'Abstract classes define shared contracts with partial implementation. `final` prevents extension or override. Static methods belong to the class instead of an object.',
    code: `<?php
abstract class PaymentGateway {
  abstract public function charge(float $amount): string;
}

final class StripeGateway extends PaymentGateway {
  public function charge(float $amount): string {
    return "Charged $" . number_format($amount, 2);
  }
}

echo (new StripeGateway())->charge(49);
?>`,
  },
  {
    id: 'enums',
    chapter: 'Advanced OOP',
    title: 'Enums',
    concept: 'Enums represent a fixed set of named values. They make state, roles, payment statuses, and option sets safer than loose strings.',
    code: `<?php
enum OrderStatus: string {
  case Draft = "draft";
  case Paid = "paid";
  case Shipped = "shipped";
}

echo OrderStatus::Paid->value;
?>`,
  },
  {
    id: 'attributes-readonly',
    chapter: 'Advanced OOP',
    title: 'Attributes and Readonly',
    concept: 'Attributes attach structured metadata to classes, methods, or properties. `readonly` properties can be written once, which is useful for immutable DTOs and value objects.',
    code: `<?php
#[Attribute]
class Route {
  public function __construct(public string $path) {}
}

#[Route("/invoices")]
final class InvoiceController {
  public function __construct(
    public readonly string $name
  ) {}
}

echo "Route metadata attached";
?>`,
  },
  {
    id: 'composer-autoload',
    chapter: 'Architecture',
    title: 'Composer Autoloading and PSR-4',
    concept: 'Composer autoloading maps namespaces to folders, so classes can be loaded automatically. PSR-4 is the common convention used by modern PHP projects and frameworks.',
    code: `<?php
require __DIR__ . "/vendor/autoload.php";

use App\\Billing\\InvoiceService;

echo "PSR-4 autoload maps App\\\\ to src/";
?>`,
  },
  {
    id: 'dependency-injection',
    chapter: 'Architecture',
    title: 'Dependency Injection',
    concept: 'Dependency injection passes collaborators into a class instead of creating them inside. This makes code easier to test, replace, and maintain.',
    code: `<?php
class Mailer {
  public function send(string $message): string {
    return "Sent: " . $message;
  }
}

class WelcomeService {
  public function __construct(private Mailer $mailer) {}

  public function welcome(): string {
    return $this->mailer->send("Welcome");
  }
}

echo (new WelcomeService(new Mailer()))->welcome();
?>`,
  },
  {
    id: 'pdo-crud-transactions',
    chapter: 'Databases',
    title: 'PDO CRUD and Transactions',
    concept: 'Professional database code uses prepared statements for create/read/update/delete operations and transactions when multiple writes must succeed or fail together.',
    code: `<?php
$pdo = new PDO("mysql:host=localhost;dbname=app", "user", "secret");

try {
  $pdo->beginTransaction();

  $invoice = $pdo->prepare(
    "INSERT INTO invoices (client_email, total) VALUES (?, ?)"
  );
  $invoice->execute(["maya@example.com", 249.00]);

  $item = $pdo->prepare(
    "INSERT INTO invoice_items (invoice_id, description, amount) VALUES (?, ?, ?)"
  );
  $item->execute([$pdo->lastInsertId(), "Website fixes", 249.00]);

  $pdo->commit();
  echo "Transaction committed";
} catch (Throwable $error) {
  $pdo->rollBack();
  echo "Transaction rolled back";
}
?>`,
  },
  {
    id: 'phpunit-testing',
    chapter: 'Testing and Quality',
    title: 'PHPUnit Testing',
    concept: 'PHPUnit is the standard testing tool for many PHP projects. Unit tests verify small pieces of logic, while integration tests cover database, HTTP, or framework behavior.',
    code: `<?php
use PHPUnit\\Framework\\TestCase;

function addTax(float $amount, float $rate): float {
  return $amount + ($amount * $rate);
}

final class PriceTest extends TestCase {
  public function testTaxIsAdded(): void {
    $this->assertSame(118.0, addTax(100, 0.18));
  }
}
?>`,
  },
  {
    id: 'error-logging',
    chapter: 'Testing and Quality',
    title: 'Error Reporting and Logging',
    concept: 'Development should show useful errors, while production should log errors without exposing secrets to users. Configure `error_reporting`, display settings, and application logs intentionally.',
    code: `<?php
error_reporting(E_ALL);
ini_set("display_errors", "0");
error_log("Payment provider timeout");

echo "User-friendly error page";
?>`,
  },
  {
    id: 'framework-basics',
    chapter: 'Frameworks',
    title: 'Laravel and Symfony Basics',
    concept: 'Modern PHP frameworks organize routes, controllers, requests, services, models, views, middleware, validation, migrations, queues, and tests. Learn core PHP first, then use frameworks to ship faster.',
    code: `<?php
class InvoiceController {
  public function index(InvoiceService $service): array {
    return $service->latestForUser(42);
  }
}

class InvoiceService {
  public function latestForUser(int $userId): array {
    return [
      ["id" => 1001, "total" => 249.00],
      ["id" => 1002, "total" => 99.00],
    ];
  }
}

$controller = new InvoiceController();
$invoices = $controller->index(new InvoiceService());

echo "Returned " . count($invoices) . " invoices";
?>`,
  },
  {
    id: 'deployment-env',
    chapter: 'Frameworks',
    title: 'Environment and Deployment',
    concept: 'Production PHP apps need environment variables, secret management, dependency installs, optimized autoloading, migrations, cache warmup, HTTPS, backups, monitoring, and rollback plans.',
    code: `<?php
$_ENV["APP_ENV"] = "production";
$_ENV["DATABASE_URL"] = "mysql://user:secret@localhost/app";
$_ENV["APP_KEY"] = "base64:demo-key";

$required = ["APP_ENV", "DATABASE_URL", "APP_KEY"];
$missing = [];

foreach ($required as $name) {
  if (empty($_ENV[$name])) {
    $missing[] = $name;
  }
}

if ($missing) {
  echo "Missing env: " . implode(", ", $missing);
} else {
  echo "Production environment ready";
}
?>`,
  },
  {
    id: 'mini-project-contact',
    chapter: 'Mini Projects',
    title: 'Contact Form Handler',
    concept: 'A simple PHP contact handler validates input, escapes output, and returns a clear response. Real apps would also add CSRF protection, rate limiting, and email delivery.',
    code: `<?php
$_POST["name"] = "Maya";
$_POST["email"] = "maya@example.com";

$name = trim($_POST["name"]);
$email = $_POST["email"];

if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo "Invalid submission";
} else {
  echo "Thanks, " . htmlspecialchars($name, ENT_QUOTES, "UTF-8");
}
?>`,
  },
  {
    id: 'mini-project-json-api',
    chapter: 'Mini Projects',
    title: 'JSON API Endpoint',
    concept: 'A PHP JSON endpoint validates input, performs work, and returns structured JSON. This pattern is common for AJAX, fetch, and mobile clients.',
    code: `<?php
header("Content-Type: application/json");

$items = [
  ["id" => 1, "title" => "Learn syntax"],
  ["id" => 2, "title" => "Build API"]
];

echo json_encode([
  "ok" => true,
  "items" => $items
]);
?>`,
  },
];

const EXPECTED_OUTPUTS = {
  'hello-php': `Hello, PHP!`,
  'php-tags': `Rendered by PHP`,
  comments: `Comments do not print`,
  variables: `Maya is learning PHP.`,
  'echo-print': `First line
Second line`,
  'data-types': `string(7) "Invoice"
float(125.5)
bool(true)
array(2) {
  [0]=> string(6) "Design"
  [1]=> string(11) "Development"
}`,
  strings: `Hello, Ada
Ada Lovelace`,
  'string-functions': `20
LEARN PHP ONLINE
  Learn server code online  `,
  'numbers-math': `Total: 58.99`,
  casting: `50`,
  constants: `webdevpuneet.com
0.18`,
  operators: `80
Discount allowed`,
  'if-else': `B`,
  'switch-match': `Can edit content`,
  'while-loop': `Item 1
Item 2
Item 3`,
  'for-loop': `1
2
3
4
5`,
  'foreach-loop': `Learn HTML
Learn CSS
Learn PHP`,
  functions: `$49.90`,
  'typed-functions': `118`,
  'anonymous-arrow': `236`,
  'indexed-arrays': `red
3`,
  'associative-arrays': `Maya is admin`,
  'array-functions': `11.8
29.5
47.2`,
  superglobals: `Hello Maya`,
  'forms-get-post': `Received: maya@example.com`,
  validation: `Valid email`,
  sanitization: `&lt;script&gt;alert(1)&lt;/script&gt;`,
  dates: `2026-05-27
2026-06-03`,
  'file-read-write': `Learn PHP files`,
  'cookies-sessions': `Theme cookie set
Session user: 42`,
  filters: `Valid URL`,
  json: `{"name":"Maya","role":"admin"}
admin`,
  exceptions: `Payment failed`,
  'classes-objects': `Invoice for Acme`,
  inheritance: `admin`,
  'interfaces-traits': `name,email`,
  namespaces: `INV-1001`,
  iterables: `1
2
3`,
  'pdo-mysql': `Found user: maya@example.com`,
  regex: `Valid slug`,
  'ajax-api': `{"ok":true,"message":"Saved"}`,
  'composer-security': `Dependencies loaded and secrets checked`,
  'include-require': `Shared files loaded`,
  'scope-static-global': `1001
1002`,
  'strict-types': `118`,
  'password-hashing': `Login allowed`,
  'csrf-protection': `CSRF token valid`,
  'file-uploads': `Upload accepted`,
  'abstract-final-static': `Charged $49.00`,
  enums: `paid`,
  'attributes-readonly': `Route metadata attached`,
  'composer-autoload': `PSR-4 autoload maps App\\ to src/`,
  'dependency-injection': `Sent: Welcome`,
  'pdo-crud-transactions': `Transaction committed`,
  'phpunit-testing': `OK (1 test, 1 assertion)`,
  'error-logging': `User-friendly error page`,
  'framework-basics': `Returned 2 invoices`,
  'deployment-env': `Production environment ready`,
  'mini-project-contact': `Thanks, Maya`,
  'mini-project-json-api': `{"ok":true,"items":[{"id":1,"title":"Learn syntax"},{"id":2,"title":"Build API"}]}`,
};

LESSONS.forEach(lesson => {
  lesson.expectedOutput = EXPECTED_OUTPUTS[lesson.id];
});

export const CHAPTERS = [...new Set(LESSONS.map(lesson => lesson.chapter))];
