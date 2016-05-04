/*
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      This file is part of the Smart Developer Hub Project:
        http://www.smartdeveloperhub.org/
      Center for Open Middleware
            http://www.centeropenmiddleware.com/
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      Copyright (C) 2015 Center for Open Middleware.
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
                http://www.apache.org/licenses/LICENSE-2.0
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.
    #-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=#
*/

require([
    "sdh-framework",
    "sdh-framework/widgets/Table/table",
    "sdh-framework/widgets/LinesChart/linesChart",
    "sdh-framework/widgets/PieChart/piechart",
    "css!nvd3",
    "css!bootstrap-css"
    /*, your other dependencies here */
], function() {
    framework.ready(function() {
        console.log("Framework ready");

        // CONTEXTS
        var directorCtx = "director-context";
        var pManagerCtx = "developer-context";

        // POST MODIFIERS
        var toPercentagePostModifier = function toPercentagePostModifier(resourceData) {

            var values = resourceData['data']['values'];
            for(var x = 0; x < values.length; x++) {
                values[x] = Math.round(values[x] * 100);
            }

            return resourceData;

        };


        // ------------------------------- SELECTION OF DIRECTOR -------------------------------
        framework.data.observe([{ // We use the data layer to find a director
            id: 'userlist'
        }], function(framework_res) {

            if(framework_res.event === 'data') { //First check that is a "data" event
                var users = framework_res.data.userlist[0].data;
                var director = 1; //This is the value of type "director"
                for(var u = 0; u < users.length; ++u) {
                    for(var orgId in users[u].positionsByOrgId) {
                        if(users[u].positionsByOrgId[orgId].indexOf(director) !== -1) {

                            // Update the context to make the dependant widgets change
                            framework.data.updateContext(directorCtx, { uid: users[u].uid });
                            return;
                        }
                    }

                }
            }

        });


        // ------------------------------- TABLE OF DEVELOPERS -------------------------------
        var table_dom = document.getElementById("pmanagers-table");
        var table_metrics = ['view-director-productmanagers'];
        var table_configuration = {
            columns: [
                {
                    img: "avatar",
                    width: "40px"
                },
                {
                    label: "",
                    property: "name"
                }
            ],
            updateContexts: [
                {
                    id: pManagerCtx,
                    filter: [
                        {
                            property: "uid",
                            as: "uid"
                        }
                    ]
                }
            ],
            keepSelectedByProperty: "uid",
            selectable: true,
            minRowsSelected: 1,
            maxRowsSelected: 5,
            filterControl: true,
            initialSelectedRows: 1,
            showHeader: false,
            alwaysOneSelected: true,
            scrollButtons: true,
            height: 568
        };
        new framework.widgets.Table(table_dom, table_metrics, [directorCtx], table_configuration);


        // ------------------------------- PRODUCT MANAGER ACTIVITY -------------------------------
        var lines_dom = document.getElementById("pmanagers-activity");
        var lines_metrics = [
            {
                id: 'pmanager-activity',
                max: 60,
                post_modifier: toPercentagePostModifier
            }
        ];
        var lines_configuration = {
            xlabel: '',
            ylabel: 'Activity (%)',
            interpolate: 'monotone',
            height: 300,
            labelFormat: '¬_D.data.info.uid.name¬',
            area: true
        };
        new framework.widgets.LinesChart(lines_dom, lines_metrics, [pManagerCtx], lines_configuration);


        // ------------------------------- TEAM MEMBERS ROLES (pie Chart) -------------------------------------
        var team_members_pie_dom = document.getElementById("team-members-pie");
        var team_members_pie_metrics = [
            {
                id: 'pmanager-stakeholders',
                max: 1,
                aggr: "sum",
                post_aggr: 'sum'
            },
            {
                id: 'pmanager-swdevelopers',
                max: 1,
                aggr: "sum",
                post_aggr: 'sum'
            },
            {
                id: 'pmanager-pjmanagers',
                max: 1,
                aggr: "sum",
                post_aggr: 'sum'
            },
            {
                id: 'pmanager-swarchitects',
                max: 1,
                aggr: "sum",
                post_aggr: 'sum'
            }
        ];
        var team_members_pie_configuration = {
            height: 250,
            showLegend: true,
            showLabels: false,
            labelFormat: "¬_D.data.info.title¬",
            maxDecimals: 0
        };
        new framework.widgets.PieChart(team_members_pie_dom, team_members_pie_metrics,
            [pManagerCtx], team_members_pie_configuration);

    });


});
