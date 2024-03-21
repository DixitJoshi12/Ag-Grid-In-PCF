# AG Grid in PCF

### Here, I have implemented the integration of AG-Grid in PCF. This project demonstrates the basics of achieving an Excel-like feature in our Power Canvas App.

### prerequisites-
* node js.
* Microsoft Power Platform CLI.
* VS Code as a text editor.
* dotnet build tools or dotnet sdk.
* API as a data source.

### Notes:
* I have used external API as a data source for the Ag-Grid.
* Anyone can fork or clone this repo and fine-tune the AgGrid.tsx file.
* can change the grouped column or pivot column.

### How to Use the Grid
Once the component is imported and added to the custom component list, we can use it in your canvas app by dragging it.  
initially, the grid has no populated data see the screenshot-  


![Sample Image  5](https://imgur.com/jXQWwEg.png)    


Now, you need to configure the properties like ApiUrl,enableRowGroupColumns(optional),pivotColumns(optional), and aggFunctionColumns(optional).  
Grid requires an API to populate data.  
here, you can use ag-grid sample API "https://www.ag-grid.com/example-assets/olympic-winners.json"  


![Sample Image  6](https://imgur.com/pU88vk9.png)  

Similarly, if you want to enable row grouping, pivot column, and aggregate function when pivot mode is enabled you can do so as follows-  
enableRowGroupColumns property will enable row grouping to the added columns.  
Note :  
those columns are separated by **semicolon(;)**.  

![Sample Image  7](https://imgur.com/Dfk9yvT.png)  

pivotColumns property will enable the column for pivot mode.  

![Sample Image  8](https://imgur.com/7VcLqRG.png)  

aggFunctionColumns property will aggregate the column data when the pivot is enabled.  

![Sample Image  9](https://imgur.com/LN97MND.png)  

### Screenshots of the components  

![Sample Image  1](https://i.imgur.com/hOPGxO0.png)  

![Sample Image 2](https://i.imgur.com/fRUHuVH.png)  

![Sample Image 10](https://imgur.com/wJsFiMI.png)  

![Sample Image 11](https://imgur.com/QTBN25G.png)  

![Sample Image 3](https://i.imgur.com/yIsC3ML.png)  

![Sample Image 4](https://i.imgur.com/eYAXcXN.png)  


### You can make your changes to it and then build the project by
``` npm run build ```
### To test the change use 
``` npm start watch ```
### 
### Check this project in your canvas app
#### Import Solution.zip to your environment which resides in the Solution directory.

### To create your Solution
