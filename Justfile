default:
    @echo "Available tasks: init, format, lint, test, check"

init:
    @echo "Initialize environment (define per project)"

format:
    @echo "Format code (hook into language-specific tools later)"

lint:
    @echo "Lint project (framework-agnostic placeholder)"

test:
    @echo "Run tests (framework-agnostic placeholder)"

check:
    just format
    just lint
    just test
