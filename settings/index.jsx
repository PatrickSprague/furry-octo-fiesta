  function mySettings(props) {
    return (
      <Page>
        <Section
          title={<Text bold align="center">Date Color</Text>}>
          <ColorSelect
            settingsKey="dateColor"
            colors={[
              {color: 'ghostwhite'},
              {color: 'mediumaquamarine'},
              {color: 'tomato'},
              {color: 'darkorange'},
              {color: 'purple'},
              {color: 'darkseagreen'},
              {color: 'lightseagreen'}
            ]}
          />
        </Section>
        <Section
          title={<Text bold align="center">Time Color</Text>}>
          <ColorSelect
            settingsKey="timeColor"
            colors={[
              {color: 'ghostwhite'},
              {color: 'mediumaquamarine'},
              {color: 'tomato'},
              {color: 'darkorange'},
              {color: 'purple'},
              {color: 'darkseagreen'},
              {color: 'lightseagreen'}
            ]}
          />
        </Section>
      </Page>
    );
  }
  
  registerSettingsPage(mySettings);