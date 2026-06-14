# Contributing

## How to Contribute

### 1. Fork the Project
- Navigate to the repository on GitHub
- Click the "Fork" button to create your own copy
- Clone your forked repository: `git clone https://github.com/your-username/your-repo.git`

### 2. Set Up Your Branch
- Create and switch to a feature branch: `git checkout -b working-on-issue-#24`
- Use descriptive branch names: `feature/`, `fix/`, `docs/`, `chore/` prefixes recommended
- Keep branch names concise and relevant to the issue

### 3. Make Your Changes
- Implement your fix or feature
- Follow the project's coding style and conventions
- Write clean, readable code with minimal comments
- Use appropriate commit messages:
  - `feat: add new feature`
  - `fix: resolve issue #24`
  - `docs: update documentation`
  - `chore: update dependencies`
  - `refactor: improve code structure`

### 4. Test Your Changes
- Run the test suite: `npm test` or `yarn test`
- Ensure all tests pass before committing
- Run linting: `npm run lint` or `yarn lint`
- Check for type errors: `npm run typecheck` or `yarn typecheck`

### 5. Push Your Changes
- Stage your changes: `git add .`
- Commit with descriptive message: `git commit -m "feat: implement new feature for issue #24"`
- Push to your fork: `git push origin working-on-issue-#24`

### 6. Create a Pull Request
- Navigate to your forked repository on GitHub
- Click the "Compare & pull request" button
- Use this PR template:
  ```
  ## Summary
  Brief description of changes made in this PR

  ## Changes Made
  - List all significant changes
  - Include issue references (e.g., fixes #24)

  ## Testing
  - All tests pass
  - Manual testing completed
  - No regressions introduced

  ## Related Issues
  - Fixes issue #24
  - Related to issue #25

  ## Screenshots (if applicable)
  - Add any relevant screenshots or examples

  ## Checklist
  - [ ] Code follows project conventions
  - [ ] Tests pass
  - [ ] Documentation updated
  - [ ] No linting errors
  ```

### 7. Wait for Review
- Maintainer will review your PR and provide feedback
- Address any requested changes
- Make additional commits if needed
- Once approved, maintainer will merge your PR

## Commit Message Guidelines

### Conventional Commits Format
Use the format: `<type>(<scope>): <description>`

#### Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect code meaning (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
- **ci**: Changes to CI configuration files and scripts

#### Examples:
- `feat: add user authentication`
- `fix: resolve login issue for inactive users`
- `docs: update README with installation instructions`
- `style: format code with Prettier`
- `refactor: simplify user service logic`
- `perf: optimize database queries`
- `test: add unit tests for auth middleware`
- `chore: update package dependencies`
- `ci: configure GitHub Actions workflow`

## Branch Naming Conventions

- `feature/<description>` - New features
- `fix/<description>` - Bug fixes
- `docs/<description>` - Documentation changes
- `style/<description>` - Code style changes
- `refactor/<description>` - Code refactoring
- `test/<description>` - Test additions or modifications
- `chore/<description>` - Maintenance tasks

## Code Quality Standards

- Write clean, readable code with meaningful variable names
- Use consistent formatting (Prettier/ESLint)
- Add type annotations where appropriate
- Write unit tests for new code
- Keep functions and methods small and focused
- Avoid code duplication
- Document public APIs with JSDoc comments