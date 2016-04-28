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
    "css!nvd3"
    /*, your other dependencies here */
], function() {
    framework.ready(function() {
        console.log("Framework ready");

        // CONTEXTS
        var developerCtx = "developer-context";

        // TABLE OF DEVELOPERS
        var table_dom = document.getElementById("developers-table");
        var table_metrics = ['view-developers'];
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
                    id: developerCtx,
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
            maxRowsSelected: 1,
            filterControl: true,
            initialSelectedRows: 1,
            showHeader: false,
            alwaysOneSelected: true,
            scrollButtons: true,
            height: 568
        };
        new framework.widgets.Table(table_dom, table_metrics, [], table_configuration);

        // DEVELOPER ACTIVITY
        var lines_dom = document.getElementById("developers-activity");
        var lines_metrics = [
            {
                id: 'member-activity',
                max: 60
            }
        ];
        var lines_configuration = {
            xlabel: '',
            ylabel: 'Activity',
            interpolate: 'monotone',
            height: 300,
            labelFormat: '¬_D.data.info.uid.name¬',
            area: true,
            colors: ['#004C8B']
        };
        new framework.widgets.LinesChart(lines_dom, lines_metrics, [developerCtx], lines_configuration);

    });
});
