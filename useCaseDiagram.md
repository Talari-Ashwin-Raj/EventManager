# Use Case Diagram

This diagram outlines the interactions between campus actors and the event management system.

```mermaid
useCaseDiagram
    actor Admin
    actor Organizer
    actor Volunteer
    actor Student

    package "Smart Campus Event System" {
        usecase "Authenticate (Login/JWT)" as UC1
        usecase "Approve Club/Organizer" as UC2
        usecase "Create Event" as UC3
        usecase "Register for Event" as UC4
        usecase "Create Volunteer Task" as UC5
        usecase "Assign Task to Volunteer" as UC6
        usecase "Complete Task" as UC7
        usecase "View Event Dashboard" as UC8
    }

    Admin --> UC1
    Admin --> UC2
    Admin --> UC8

    Organizer --> UC1
    Organizer --> UC3
    Organizer --> UC5
    Organizer --> UC6
    Organizer --> UC8

    Volunteer --> UC1
    Volunteer --> UC4
    Volunteer --> UC7

    Student --> UC1
    Student --> UC4
```
