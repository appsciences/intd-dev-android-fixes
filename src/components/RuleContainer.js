import React, {Component} from 'react';
import {Text, View} from "react-native";

import ViewPager from '../../mods/react-native-viewpager'
import styles from "./../styles/styles";

import RuleCardHi from './RuleCardHi'
import RuleCard1 from './RuleCard1'
import RuleCard2 from './RuleCard2'
import RuleCard3 from './RuleCard3'
import RuleCard4 from './RuleCard4'
import RuleCardPlay from './RuleCardPlay'

const PAGES = [
    0,
    1,
    2,
    3,
    4,
    5
];

export default class RuleContainer extends Component {

    constructor (props) {
        super(props)
        const dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataSource: dataSource.cloneWithPages(PAGES),
        }
    }

    // componentWillUpdate(){
    //     this.props.rewindRules && this.refs.slider.goToPage(0,false)
    // }

    goToPage = (pageNo) => this.refs.slider.goToPage(0)

    render = () =>
        <ViewPager
            dataSource={this.state.dataSource}
            ref="slider"
            onChangePage={()=>{}}
            isLoop={false}
            initialPage={0}
            autoPlay={false}
            currentPage={0}
            //hack to return it back to first page when going back to rules from cards for the first time
            renderPage={(pageIndex) =>
                <View
                    style={styles.ruleContainer}>

                    <Text style={styles.heading}>{[
                        '--',
                        '-----------',
                        '-----------',
                        '-----------',
                        '-----------',
                        '-----------',

                    ][pageIndex]}
                    </Text>

                    <View style={styles.card}>{[
                        <RuleCardHi />,
                        <RuleCard1 />,
                        <RuleCard3 />,
                        <RuleCard2 />,
                        <RuleCard4 />,
                        <RuleCardPlay
                            onDone={this.props.onDone}
                            doneText={this.props.doneText}
                        />
                    ][pageIndex]}
                    </View>

                </View>
            }

        />

}


