import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';
import JobLink from './pages/JobLink';
import Company from './pages/Company';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions:{
                title: 'DevRadar'
            }
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: 'Perfil no GitHub'
            }
        },
        JobLink:{
            screen: JobLink,
            navigationOptions:{
                title: 'Link da Vaga'
            }
        },
        Company:{
            screen: Company,
            navigationOptions:{
                title: 'Empresa'
            }
        },
    },{
        defaultNavigationOptions:{
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle:{
                fontWeight: "bold"
            },
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: "#7D40E7"
                
            }
        }
    })
);

export default Routes;