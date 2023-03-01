# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

---
### **1. Ticket 1: Database design (4 hours)**

Create 5 entities with the specified properties using any ORM library (TypeORM, Prisma) as follows:

1. 
   |facilities|
   |---|
   |id: auto increment|
   |name: string|
2. 
   |agents|
   |---|
   |id: auto increment|
   |custom_agent_id: uuid|
   |name: string|
   |facility_id: integer|
3. 
   |shifts|
   |---|
   |id: auto increment|
   |description: string|
   |hours: integer|
4. 
   |facilities_shifts|
   |---|
   |id: auto increment|
   |facility_id: integer|
   |shift_id: integer|
5. 
   |agents_shifts|
   |---|
   |id: auto increment|
   |agent_id: integer|
   |shift_id: integer|
   |start_date: datetime|

AC:
> Must include the seeding scripts that corresponds to all given entities
>
> All seeding scripts must have the rollback command

---
### **2. Ticket 2: Get Shifts by Facility (4 hours)**

Description:
> Create a function so-called ```getShiftsByFacility(falicity_id: integer)``` to get all Shifts worked that quarter, including some metadata about the Agent assigned to each

Implementation:
> Use any ORM library to generate the SQL-like statement as follows:
> ```sql
> SELECT sh.*, f.*, a.* FROM shifts AS sh 
> INNER JOIN facilities_shifts AS f_sh ON f_sh.shift_id = sh.id
> INNER JOIN facilities AS f ON f.id = f_sh.facility_id
> INNER JOIN agents_shifts AS a_sh ON a_sh.shift_id = f.id
> INNER JOIN agents AS a ON a.id = a_sh.agent_id
> WHERE QUARTER(a_sh.start_date) = QUARTER(NOW())

AC:
> Must include the unitest case for this function

---
### **3. Ticket 3: Generate PDF report (4 hours)**

Description:
> Create a function so-called ```generateReport(shifts: array)``` to convert the list of Shifts into a PDF which can be submitted by the Facility for compliance.

Implementation:
> Iterate through the list of Shifts then accumulate all information by agent

AC:
> Must include the unitest case for this function
>
> The generated report must include all of information as follows:
>> Agent's info (agent's id, agent's name, total working hours) \
>> Facility's info (facility's id, facility's name)
