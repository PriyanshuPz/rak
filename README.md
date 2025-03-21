# Rak

Rak is a platform where users can securely upload, showcase, and verify their certificates and achievements on the InterPlanetary File System (IPFS).

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Decentralized Storage**: Certificates and achievements are stored securely on IPFS for decentralized and permanent access.
- **Verification**: Employing blockchain technology or other methods for verifying the authenticity of uploaded certificates.
- **User-Friendly Interface**: Intuitive design for easy uploading, viewing, and managing of certificates.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/) (version 18.X.X)
- [IPFS](https://ipfs.io/) (optional: if you want to run your own IPFS node)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Rak.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Rak
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

## Usage

1. Start the Rak application:

   ```bash
   bun dev
   ```

2. Create a `.env` file in the root directory of the project with the following environment variables:

   ```env
   DATABASE_URL="mongodb://localhost:27017/rak"

   AUTH_GOOGLE_SECRET="google-secret-key"
   AUTH_GOOGLE_ID="google-id"

   AUTH_GITHUB_SECRET="github-secret-key"
   AUTH_GITHUB_ID="github-id"

   AUTH_URL="http://localhost:3000/api/auth"
   AUTH_SECRET="secret-key"

   NEXT_PUBLIC_URL="http://localhost:3000"
   NEXT_PUBLIC_IPFS_KEY="ipfs-key"
   ```

3. Generate prisma client:

   ```bash
   bunx prisma generate
   ```

4. Open your web browser and go to [http://localhost:3000](http://localhost:3000).

5. Follow the on-screen instructions to upload, showcase, and verify certificates.

## Contributing

We welcome contributions from the community! If you'd like to contribute to Rak, please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
