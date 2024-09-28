Hello This is ChargeNet the mobile application that will help all Electric car users


For commits : 

Commit Message Template
For every commit, follow the structure below. This helps in tracking changes clearly, associating them with the relevant ticket, and outlining the impact of the commit.


[ticket] Setup-Infrastructure-Install-Party

details: Short summary of the change (max 50 characters). Be concise and use the present tense. Example: "Add user authentication to login form."

impact: Specify which part of the system is affected (choose from: front/back/database/deploy/certificates).


Commit Message Breakdown
  [ticket]: A constant prefix followed by the relevant ticket name, such as Setup-Infrastructure-Install-Party. The ticket link should be part of the context.

  details: A short description (up to 50 characters) summarizing the change.

  Example: Add user authentication to login form.
  
  impact: Specify which part of the project is affected:

    front: Frontend changes
    back: Backend changes
    database: Database-related changes
    deploy: Deployment-related changes
    certificates: SSL or certificate-related changes

Example Commit Messages

[ticket] Setup-Infrastructure-Install-Party

details: Add user authentication feature.

impact: front/back
-------------------------------------------------------------

[ticket] Setup-Infrastructure-Install-Party

details: Fix logout crash in the backend authentication.

impact: back/database

----------------------------------------------
[ticket] Setup-Infrastructure-Install-Party

details: Update certificates for secure communication.

impact: certificates/deploy

--------------------------------------------------
How to Use the Commit Template

When making a commit, use the following format to create your commit message:

bash
git add .
git commit -m "[ticket] Setup-Infrastructure-Install-Party" \
  -m "details: Short summary of the change." \
  -m "impact: front/back/database/deploy/certificates"

bash
git commit -m "[ticket] Setup-Infrastructure-Install-Party" \
  -m "details: Add user authentication feature." \
  -m "impact: front/back"
  
  -------------------------------------------------------------

  
