# Campus Bazaar

Campus Bazaar is a university-focused marketplace project intended to help students discover and exchange products within their campus community.

## Project Status

The application currently uses ASP.NET Core MVC with .NET 8. The initial backend foundation includes a health-check endpoint and the existing MVC application structure.

## Technology Stack

- C#
- ASP.NET Core MVC
- .NET 8
- Visual Studio Community
- Git and GitHub

Database integration and additional API features will be documented when implemented.

## Project Structure

```text
Campus_Bazaar v1/
├── Controllers/
│   ├── HealthController.cs
│   └── HomeController.cs
├── Data/
├── DTOs/
├── Models/
├── Properties/
├── Services/
├── Views/
├── wwwroot/
├── Program.cs
└── Campus_Bazaar v1.csproj
```

## Prerequisites

- .NET 8 SDK
- Visual Studio 2022 or a compatible .NET development environment
- Git

## Run Locally

1. Clone the repository.
2. Open a terminal in the repository root.
3. Restore dependencies:

   ```powershell
   dotnet restore ".\Campus_Bazaar.sln"
   ```

4. Build the solution:

   ```powershell
   dotnet build ".\Campus_Bazaar.sln"
   ```

5. Run the application:

   ```powershell
   dotnet run --project ".\Campus_Bazaar v1\Campus_Bazaar v1.csproj"
   ```

6. Open the local address printed in the terminal.

## Health Endpoint

The backend provides a basic health-check endpoint:

```http
GET /api/health
```

Example response:

```json
{
  "status": "Healthy",
  "application": "Campus Bazaar"
}
```

The endpoint returns HTTP 200 when the application is running and the request is handled successfully.

## Development Notes

- Keep generated build output such as `bin/` and `obj/` out of version control.
- Do not commit passwords, API keys, or other secrets.
- Add database configuration, API features, and setup instructions as those features are implemented.

## Contributors

See the repository's Git history for individual contributions.
