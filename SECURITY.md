# Security policy

## Supported versions

compressed-ptr has not had a tagged release yet. Security fixes go to the
`main` branch. Once releases exist, the latest release will also receive
fixes.

## Reporting a vulnerability

Please do **not** open a public issue for a security problem. Report it
privately through GitHub instead: on the repository page, open the
**Security** tab and choose **Report a vulnerability**.

Include, as far as you can:

- the affected header and function, and the commit you tested;
- a minimal program that shows the problem, and how to build it;
- the sanitizer output or crash you saw;
- what an attacker could do with it, for example whether the input comes
  from outside the program.

You can expect an acknowledgement within a week. We will agree a fix and a
disclosure date with you, and credit you in the release notes unless you
prefer otherwise.

## Scope

compressed-ptr is a header-only library: a problem usually needs a program
that uses it in a particular way. In scope are memory-safety bugs in the
library itself (out-of-bounds access, use after free, double free,
undefined behaviour in the allocator or the containers) and ways for input
from outside a program to corrupt a `mapped_cage` file into memory
corruption. Out of scope are misuses the documentation forbids, such as
compressing a pointer that does not point into the cage, or opening a
`mapped_cage` file from an untrusted source. Such a file is trusted data:
its contents are used as allocator state and pointers.
