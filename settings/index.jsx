  function mySettings(props) {
    return (
      <Page>
        <Section
          title={<Text bold align="center">Color Settings</Text>}>
          <ColorSelect
            settingsKey="color"
            colors={[
              {color: 'ghostwhite'},
              {color: 'mediumaquamarine'},
              {color: 'tomato'},
              {color: 'purple'},
              {color: 'deepskyblue'},
              {color: 'chartreuse'},
              {color: 'darkorange'}
            ]}
          />
        </Section>
      </Page>
    );
  }
  
  registerSettingsPage(mySettings);