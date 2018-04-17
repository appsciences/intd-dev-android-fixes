import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import styles from '../styles/styles'

export default TcView = ({ruleCardIndex, termsAccepted, onDone}) =>
    <View style={styles.dialogContainer}>
        <ScrollView>
            <Text>
                Terms and conditions

                As a condition of use, you promise not to use the Services for any purpose that is unlawful or prohibited by these Terms, or any other purpose not reasonably intended by Whatever the Mood.  By way of example, and not as a limitation, you agree not to use the Services:

                To abuse, harass, impersonate or intimidate any person;
                To post or transmit, or cause to be posted or transmitted, any Content that is libellous, defamatory, obscene, pornographic, abusive, offensive by our standards, or that infringes any copyright or other right of any person;
                For any purpose (including posting or viewing Content) that is not permitted under the laws and jurisdiction where you use the Services;
                To post or transmit, or cause to be posted or transmitted, any communication or solicitation designed or intended to obtain password, account, or private information from any INTD user;
                To create or transmit unwanted ‘spam’ to any person or any URL
                To create multiple accounts for the purpose of voting for or against users’ submissions, photographs or images;
                To post copyrighted Content which doesn’t belong to you, with exception of Blogs, where you may post such Content with explicit mention of the author’s name and a link to the source of the Content:
                With the exception of accessing RSS feeds, you will not use any robot, spider, scraper or other automated means to access the Site/App for any purpose without our express written permission.  Additionally, you agree that you will not (i) take any action that imposes, or may impose in our sole discretion an unreasonable or disproportionately large load on our infrastructure (ii) interfere or attempt to interfere with the proper working of the Site/app or any activities conducted on the Site, or (iii) bypass any measures we may use to prevent or restrict access to the Site/App:
                To artificially inflate or alter vote counts, comments, or any other Service or for the purpose of giving or receiving money or other compensation in exchange for votes, or for participating in any other organized effort that in any way artificially alters the results of Services;
                To advertise to, or solicit any user to buy or sell any products or services, or to use any information obtained from the Services in order to contact, advertise to, solicit, or sell to any user without their prior explicit consent:
                To promote or sell Content or another person
            </Text>
        </ScrollView>

    </View>


