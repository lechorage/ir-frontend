import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import SwipeableViews from 'react-swipeable-views';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#D32F2F',
      dark: '#002884',
      contrastText: '#fff',
      textSecondary: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    textSecondary: '#ffffff',
  },
});

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  flex: {
    flex: 1,
    color: "#fff"
  },
  primaryText: {
    color: theme.palette.textSecondary,
  },
  column: {
    textAlign: 'left',
    flexBasis: '20%',
  },
  reivewColumn: {
    textAlign: 'left',
    flexBasis: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

class YelpList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="YelpList">
        {
          this.props.data.map(function (yelp) {
            return <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>{yelp.resName}</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>{yelp.address}</Typography>
                </div>
                <div className={classes.reivewColumn}>
                  <Typography className={classes.secondaryHeading}>{yelp.reviews[0].content}</Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {
                  yelp.reviews.map(function (review) {
                    return <div className={classNames(classes.column, classes.helper)}>
                      <Typography variant="caption">
                        {review.content}
                        <br />
                      </Typography>
                    </div>
                  }
                  )
                }
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small" color="primary" href={yelp.url} target="_blank">
                  Detail
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          })
        }
      </div>
    )
  }
}
class Index extends React.Component {
  state = {
    data: [],
  };

  handleSearch = e => {
    if (e.keyCode == 13) {
      fetch('http://lechorage.com:8080/?query=' + e.target.value)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ data: responseJson })
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" style={styles.primaryText} className={classes.flex}>
                Yelp Review Search
          </Typography>
            </Toolbar>
          </AppBar>
          <FormControl className={classes.margin} fullWidth margin="normal">
            <TextField className="search-input" label="Search by Reviews" fullWidth onKeyDown={this.handleSearch} />
          </FormControl>
          <YelpList data={this.state.data} classes={classes} />

        </div>
      </MuiThemeProvider>

    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Index);
