import React from 'react';

const FooterItem = ({ text }) => (
  <span className="AppFooterContent">
    {text}
  </span>
);

const AppFooter = ({ siteUpdatedAt, dataLastUpdatedAt, metaDataLastUpdatedAt }) => (
  <div className="AppFooter">
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
