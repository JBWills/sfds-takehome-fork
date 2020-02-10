import React from 'react';
import { createUseStyles } from 'react-jss';
import { MEDIUM_BREAKPOINT } from '../util/jssConstants';

const useStyles = createUseStyles({
  footer: {
    padding: '50px 10px 50px 10px',
    marginTop: '20px',

    minHeight: '100px',
    backgroundColor: '#eeeeee',
    display: 'flex',
    flexWrap: 'wrap',
  },

  footerContent: {
    fontWeight: 'bolder',
    color: '#444444',
    flexBasis: '50%',
  },

  [MEDIUM_BREAKPOINT]: {
    footer: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
  },
});

const FooterItem = ({ text }) => (
  <span className={useStyles().footerContent}>{text}</span>
);

const AppFooter = ({
  siteUpdatedAt,
  dataLastUpdatedAt,
  metaDataLastUpdatedAt,
}) => (
  <div className={useStyles().footer}>
    <FooterItem text={'Site by James Wills'} />
    <FooterItem text={'Publishing Dept: Mayor'} />
    <FooterItem text={'Publishing Frequency: Annually'} />
    <FooterItem text={'Data Change Frequency: Annually'} />
    <FooterItem text={'Dataset Owner: Charles MacNulty'} />
    <FooterItem text={`Site last updated: ${siteUpdatedAt}`} />
    <FooterItem text={`Data last updated: ${dataLastUpdatedAt}`} />
    <FooterItem text={`Metadata last updated: ${metaDataLastUpdatedAt}`} />
  </div>
);

export default AppFooter;
