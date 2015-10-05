# AngularRetrospectionTool

## Motivation
Most of the developers in the software industry must be familiar with agile methodology. [Read](http://agilemethodology.org/) for more details over agile.

In Amazon we follow a 2 week scrum process. In the end of each sprint, whole team sits and do a retrospection for the previous sprint where every team member supposed to provide their positive and negative feedbacks for the sprint.
Scrum master should accumulate all the feedbacks and create action items against negative feedbacks to avoid them in future. <br/>
Several team do the same thing over sticky notes which is fine if all team members are present in the same location which is highly unlikely in case of Amazon. In this case either a team member shared his/her feeback over conference call or via eamil. Along with this, Scrum master store all the accumulated feedbacks in a wiki (traditional way) for reference. 

## What does this tool provide ?
This tool is mainly to replace the sticky notes with a complete end to end web based process with several features like
* Scrum master can create a retrospection room for the last sprint.
* Team members will be able to see the access url on their home page of the tool to add their feedbacks.
* They can view others feedbacks in the summary page.
* Scrum master can delete feedbacks to avoid duplicates and finally save the filtered list.
* Scrum master can create action items and assign them to individual team members. 
* Any team member will be able to see all the action items assigned to him/her on his/her home page. 
* Hightlight the team members who have entered the feedbacks in the summary page (Normally scrum master has to confirm from everyone where they have entered the feedbacks or not which is a hard thing to do in a big team).
<br/>

Below are some screenshots to explain the different views involved in detail.<br/>
* Home page of the web app (team member can see the link for latest sprint to add comments and action items)<br/>
![home page](http://abhitiiita.github.io/img/HomePageView.png)<br/><br/>
* Create retrospection (this view is used by scrum master to create new room for retrospection)<br/>
![create retro page](http://abhitiiita.github.io/img/createRetrospctionView.png)<br/><br/>
* View to add feedbacks(positive and negative)<br/>
![add feedback](http://abhitiiita.github.io/img/addFeedbacksView.png)<br/><br/>
* Summary View (top most part highlighted the members who have entered the feedbacks, middle part shows the summy of the feedbacks in both positive and negative sections, bottom most part povides section for adding action items and select members from the dropdown) <br/>
![summary View](http://abhitiiita.github.io/img/SummaryView.png)<br/><br/>


## Technology
The tool is based on complete MEAN Stack (M: MongoDB, E: Express, A: Angular, N:Node.js). 
