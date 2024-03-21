# AG Grid in PCF

### Here, I have implemented the integration of AG-Grid in PCF. This project demonstrates the basics of achieving an Excel-like feature in our Power Canvas App.  

### Features:
AG Grid offers a wide range of features for building powerful and customizable data grids, including sorting, filtering, grouping, column pinning, row selection, row virtualization, cell editing, and many more.

### prerequisites:
* node js.
* Microsoft Power Platform CLI.
* VS Code as a text editor.
* dotnet build tools or dotnet sdk.
* API as a data source.
  

> [!NOTE]
> User must have API as a data source for the Ag-Grid

> [!TIP]
> Clone this repo and fine-tune the AgGrid.tsx file.  
> Use sample API provided by ag-grid (given below) if you don't have an API

> [!IMPORTANT]
> This project is easily customizable you can edit it according to the use case.


### How to Use the Grid
Download the Solutions.zip locally and import it into your Solution.  
Once the component is imported and added to the custom component list, we can use it in your canvas app by dragging it.  
initially, the grid has no populated data see the screenshot-  


![Sample Image  5](https://imgur.com/jXQWwEg.png)    


#### Now, you need to configure the properties like ApiUrl,enableRowGroupColumns(optional),pivotColumns(optional), and aggFunctionColumns(optional).  
#### Grid requires an API to populate data.  
here, you can use ag-grid sample API **"https://www.ag-grid.com/example-assets/olympic-winners.json"**  


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

![Sample Image 4](https://i.imgur.com/eYAXcXN.png)  


### You can make your changes to it and then build the project by
```console
npm run build
```
### To test the change use 
```console
npm start watch
```
### 
### Check this project in your canvas app
#### Import Solution.zip to your environment which resides in the Solution directory.

### To create your Solution  
clone the repository by  

```console
git clone https://github.com/DixitJoshi12/Ag-Grid-In-PCF.git
 ```  
remove the obj and Solutions directories and make your changes according to and build the project.  
once the project is build successfully create a directory name Solutions by
```console
mkdir Solutions
```
go to the Solutions directory by
```console
cd Solutions
```
Run the following commands
```console
pac solution init --publisher-name djoshi --publisher-prefix djoshi  
```
> [!NOTE]
> You can specify any name in place of publisher-name and prefix.

```console
pac solution add-reference --path "C:/yourpath/Desktop/pcfaggrid/"
```
Finally, build the Solution by
```console
dotnet build
```
#### Once the Solution is built you can see a Solutions.zip inside the Solutions/bin/debug directory.  
![image](https://github.com/DixitJoshi12/Ag-Grid-In-PCF/assets/44132789/8aab482c-97a4-45ac-8cc0-b9b73778869a)

