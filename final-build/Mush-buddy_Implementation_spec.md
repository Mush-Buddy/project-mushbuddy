# Mush-Buddy Implementation Spec
This spec will include projected functionality, and further down the line, pseudocode

## Mushroom Identification
### Mushroom oraganization
The data is organized in the following way:

-image, name, common name, written description, (author/credit/source of description), season, shape of stem, color of stem, shape of cap, color of cap, type of gills, how gills attatch, smell, spore print, color of bruising, created, license rightsHolder of the image

The data is formatted in a csv file

### Expected functions

#### sortby(name, common name, season, shape of stem, color of stem, shape of cap, color of cap, type of gills, how gills attached, smelll, spore print, clor of bruising)

This function should be able to handle any of these parameters and returns a list of potential mushrooms identified

so many of these can be provided nonetype or null

#### add_mushroom_to_database(image, name, common name, written description, (author/credit/source of description), season, shape of stem, color of stem, shape of cap, color of cap, type of gills, how gills attatch, smell, spore print, color of bruising, created, license rightsHolder of the image)
There are a lot of parameters to this function, but at the minimum, the function should be given an image, name, author, license rightsHolder of the image(user agreement evene), shape of cap and stem, color of cap and stem



## Backend/database

## User Interface

## Connection between Backend -> User

## Connection between Mushroom data -> backend Database -> User interface
