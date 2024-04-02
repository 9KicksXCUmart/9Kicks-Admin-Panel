.DEFAULT_GOAL := build

.PHONY:fmt vet build
fmt:
	pnpm run format

lint: fmt
	pnpm run lint

run: fmt
	pnpm run dev

setup:
	git config core.hooksPath .githooks
	pnpm install
