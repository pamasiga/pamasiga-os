#!/usr/bin/env node

/**
 * PAMASIGA OS - GitHub Labels Creator
 *
 * Creates GitHub labels from startup.config.js
 * Requires: gh CLI installed and authenticated
 * Run: npm run create-labels
 */

const { execSync } = require('child_process');
const path = require('path');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✓ ${message}`, 'green');
}

function error(message) {
  log(`✗ ${message}`, 'red');
}

function warning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function header(message) {
  log(`\n${'='.repeat(60)}`, 'bright');
  log(`  ${message}`, 'bright');
  log(`${'='.repeat(60)}\n`, 'bright');
}

// Check if gh CLI is installed
function checkGhCLI() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Check if authenticated with GitHub
function checkGhAuth() {
  try {
    execSync('gh auth status', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Load configuration
function loadConfig() {
  const configPath = path.join(__dirname, '..', 'startup.config.js');
  try {
    return require(configPath);
  } catch (err) {
    error(`Could not load startup.config.js: ${err.message}`);
    process.exit(1);
  }
}

// Create a label
function createLabel(name, color, description) {
  try {
    // Remove # from color if present
    const cleanColor = color.replace('#', '');

    // Check if label exists
    try {
      execSync(`gh label list --search "${name}"`, { stdio: 'ignore' });
      // Label exists, update it
      execSync(
        `gh label edit "${name}" --color "${cleanColor}" --description "${description}"`,
        { stdio: 'ignore' }
      );
      log(`  Updated: ${name}`, 'cyan');
    } catch {
      // Label doesn't exist, create it
      execSync(
        `gh label create "${name}" --color "${cleanColor}" --description "${description}"`,
        { stdio: 'ignore' }
      );
      success(`  Created: ${name}`);
    }
  } catch (err) {
    error(`  Failed to create/update label "${name}": ${err.message}`);
  }
}

// Main function
function main() {
  header('PAMASIGA OS - GitHub Labels Setup');

  // Check prerequisites
  log('Checking prerequisites...\n');

  if (!checkGhCLI()) {
    error('GitHub CLI (gh) is not installed.');
    log('\nInstall it from: https://cli.github.com/');
    process.exit(1);
  }
  success('GitHub CLI is installed');

  if (!checkGhAuth()) {
    error('Not authenticated with GitHub.');
    log('\nRun: gh auth login');
    process.exit(1);
  }
  success('Authenticated with GitHub\n');

  // Load config
  log('Loading configuration...');
  const config = loadConfig();
  success(`Loaded config for: ${config.project.name}\n`);

  // Get repository info
  try {
    const repo = execSync('gh repo view --json nameWithOwner -q .nameWithOwner', { encoding: 'utf8' }).trim();
    log(`Repository: ${repo}\n`, 'cyan');
  } catch {
    error('Could not determine repository. Make sure you are in a git repository.');
    process.exit(1);
  }

  // Create labels
  const labelCategories = config.github.labels;

  // Type labels
  if (labelCategories.types && labelCategories.types.length > 0) {
    log('Creating type labels...', 'bright');
    labelCategories.types.forEach(label => {
      createLabel(label.name, label.color, label.description);
    });
    log('');
  }

  // Priority labels
  if (labelCategories.priorities && labelCategories.priorities.length > 0) {
    log('Creating priority labels...', 'bright');
    labelCategories.priorities.forEach(label => {
      createLabel(label.name, label.color, label.description);
    });
    log('');
  }

  // Area labels
  if (labelCategories.areas && labelCategories.areas.length > 0) {
    log('Creating area labels...', 'bright');
    labelCategories.areas.forEach(label => {
      createLabel(label.name, label.color, label.description);
    });
    log('');
  }

  // AI labels
  if (labelCategories.ai && labelCategories.ai.length > 0) {
    log('Creating AI labels...', 'bright');
    labelCategories.ai.forEach(label => {
      createLabel(label.name, label.color, label.description);
    });
    log('');
  }

  // Status labels (if defined)
  if (labelCategories.status && labelCategories.status.length > 0) {
    log('Creating status labels...', 'bright');
    labelCategories.status.forEach(label => {
      createLabel(label.name, label.color, label.description);
    });
    log('');
  }

  // Summary
  header('Labels Setup Complete! 🎉');
  log('All labels have been created/updated in your repository.');
  log('\nView labels: gh label list');
  log('Or visit: https://github.com/' + config.links.github.org + '/' + config.links.github.repo + '/labels\n');
}

// Run
try {
  main();
} catch (err) {
  error(`\nUnexpected error: ${err.message}`);
  process.exit(1);
}
