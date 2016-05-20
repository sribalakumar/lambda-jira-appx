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
    jira.issue.addComment( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function getAllProjects(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.getAllProjects( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function getAllIssueTypes(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.getAllIssueTypes( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function getAllFields(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.field.getAllFields( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function getTransitions(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.getTransitions( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function deleteIssue(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.deleteIssue( { issueKey: event.issue_key }, function(error, issue) {
        console.log(issue.fields);
        context.done(null, issue)
    });
}

function addAttachment(event, context) {
    console.log('Received event: ', event);
    // verify later the json payload of issue that is needed.
    jira.issue.addAttachment( { issueKey: event.issue_key }, function(error, issue) {
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
        context.done(new Error('Action type "' + event.action + '" not supported.'));
    }
};