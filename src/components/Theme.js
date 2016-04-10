var Colors = require('material-ui/lib/styles/colors'); //import threw undefined...
//import Colors from 'material-ui/lib/styles/colors' /*this throws undefined*/
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.indigo900,
    primary2Color: Colors.white,
    accent1Color: Colors.deepOrange500,
    accent2Color: Colors.grey100,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.indigo900,
  }
};