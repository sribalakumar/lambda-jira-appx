var JiraClient = require('jira-connector');

var jira = new JiraClient( {
    host: 'abc.atlassian.net',
    basic_auth: {
        username: '----',
        password: '----'
    }
});

function fetchJiraIssue(event, context) {
    console.log('Received event: ', event);
    jira.issue.getIssue( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
};

function createJiraIssue(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.createIssue( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function addJiraComment(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.createIssue( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function getAllProjects(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.createIssue( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function getAllIssueTypes(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.createIssue( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

exports.handler = function (event, context) {
    console.log('Received event: ', event);
    if (event.action === 'FetchIssue') {
        fetchJiraIssue(event, context);
    } else if (event.action === 'CreateIssue') {
        createJiraIssue(event, context);
    } else if (event.action === "addComment") {
        addJiraComment(event, context);
    } else if (event.action === "allProjects") {
        getAllProjects(event, context);
    } else if (event.action === "") {
        getAllIssueTypes(event, context);
    } else {
        context.done(new Error('Action type "' + event.action + '" not supported.'));
    }
};