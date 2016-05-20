var JiraClient = require('jira-connector');
var http = require('http');
var fs = require('fs');

var jira = new JiraClient( {
    host: 'abc.atlassian.net',
    basic_auth: {
        username: '----',
        password: '----'
    }
});
// event.data
//
// {"issueKey" : 'AIRS-774'}
function fetchJiraIssue(event, context) {
    jira.issue.getIssue( { issueKey: event.issueKey }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue);
    });
}

 // event.data
 //
 // {"fields":
 //  {"project":{"id":"10400"},
 //   "issuetype":{"id":"10000"},
 //   "components":[{"id":"10200"}],
 //   "description":"Bala",
 //   "security":{"id":"10101"},
 //   "summary":"This is a sample ticket",
 //   "priority":{"id":"1"},
 //   "customfield_10736":[{"id":"10537"}]}}
function createJiraIssue(event, context) {
    jira.issue.createIssue( event.data, function(error, issue) {
        console.log(issue);
        context.done(null, issue);
    });
}
// event.data
//
// { comment: { body: 'Note added by Support' },
//  issueKey: 'AIRS-774' }
function addJiraComment(event, context) {
    jira.issue.addComment( event.data, function(error, issue) {
        console.log(issue);
        context.done(null, issue);
    });
}

function getAllProjects(event, context) {
    jira.project.getAllProjects({}, function(error, project) {
        console.log(project);
        context.done(null, project);
    });
}

function getAllIssueTypes(event, context) {
    jira.issueType.getAllIssueTypes({}, function(error, issueType) {
        console.log(issueType);
        context.done(null, issueType);
    });
}

function getAllFields(event, context) {
    jira.field.getAllFields( { }, function(error, field) {
        console.log(field);
        context.done(null, field);
    });
}
// event.data
//
// {"issueKey" : 'AIRS-774'}
function getTransitions(event, context) {
    jira.issue.getTransitions( { issueKey: event.issueKey }, function(error, issue) {
        console.log(issue);
        context.done(null, issue);
    });
}
// event.data
//
// {"issueKey" : 'AIRS-774'}
function deleteIssue(event, context) {
    jira.issue.deleteIssue( { issueKey: event.issueKey }, function(error, message) {
        console.log(message);
        context.done(null, message);
    });
}
// event.data
//
// {"issueKey" : 'AIRS-774', 'file': {'url':"http://s3url.com", 'name': 'random.jpg'}}
function addAttachment(event, context) {
    var file = fs.createWriteStream("/tmp/"+event.file.name);
    var request = http.get(event.file.url, function(response) {
        var stream = response.pipe(file);
        stream.on('finish', function(){
            console.log("File Path" + file.path);
            console.log(file);
            jira.issue.addAttachment( { issueKey: event.issueKey, filename: file.path }, function(error, attachment) {
                console.log(attachment);
                console.log(error);
                context.done(null, attachment);
            });
        });
    });
}

exports.handler = function (event, context) {
    console.log('Received event: ', event);
    if (event.action === 'FetchIssue') {
        fetchJiraIssue(event, context);
    } else if (event.action === 'CreateIssue') {
        createJiraIssue(event, context);
    } else if (event.action === "AddComment") {
        addJiraComment(event, context);
    } else if (event.action === "FetchAllProjects") {
        getAllProjects(event, context);
    } else if (event.action === "FetchAllIssueTypes") {
        getAllIssueTypes(event, context);
    } else if (event.action === "GetAllFields") {
        getAllFields(event, context);
    } else if (event.action === "GetTransitions") {
        getTransitions(event, context);
    } else if (event.action === "DeleteIssue") {
        deleteIssue(event, context);
    } else if (event.action === "AddAttachment") {
        addAttachment(event, context);
    } else {
        context.done(null, ('Action type "' + event.action + '" not supported.'));
    }
};