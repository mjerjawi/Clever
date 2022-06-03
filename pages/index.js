import { Button } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { Container } from "@mantine/core";
import { Grid } from "@mantine/core";
import { Center } from "@mantine/core";
import { User } from "tabler-icons-react";
import { ShoppingCart } from "tabler-icons-react";

import { useUserContext } from "../UserProvider";
import { useAccessToken } from "@nhost/nextjs";

import Head from "next/head";
import Layout from "../components/Layout";

import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";

import { gql, useQuery,  } from "@apollo/client";

const GET_USER_QUERY = gql`
  query catQuery {
    categories {
      id
      name_en
    }
  }
`;
export async function getStaticProps(context) {

  return {
    props: { }, // will be passed to the page component as props
  };
}

const useStyles = createStyles((theme, _params, getRef) => ({
  base: {
    backgroundColor: "#0F3460",
    width: "100%",
    height: 40,
    color: "#fff",
    display: "flex",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    width: "100%",
    height: 80,
    boxSizing: "border-box",
    boxShadow: theme.shadows.xs,
  },
  searchWrapper: {
    marginTop: theme.spacing.md,
    marginRight: "auto",
    marginLeft: "auto",
    height: "100%",
  },
  logo: {
    marginTop: theme.spacing.md,
    display: "flex",
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

const Home = () => {
  const { classes } = useStyles();

 const { loading, error, data } = useQuery(GET_USER_QUERY);
  console.log(data);

  return (
    <div>
      <Head>
        <title>Clever</title>
      </Head>

      <div className={classes.base}>
        <div className={classes.wrapper}>
          <p>Hello world</p>
        </div>
      </div>
      <div className={classes.header}>
        <Grid>
          <Grid.Col xl={3} sm={0}>
            <div className={classes.logo}>
              <img
                src="logo2.png"
                alt="Girl in a jacket"
                width="160"
                height="50"
              />
              <div>
                <Button>Departments</Button>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col xl={6}>
            <div className={classes.searchWrapper}>
              <SearchBar></SearchBar>
            </div>
          </Grid.Col>
          <Grid.Col xl={3} >
            <div className={classes.logo}>
              <User size={24} />
              <ShoppingCart size={24} />
            </div>
          </Grid.Col>
        </Grid>
      </div>
      <Container size="xl">
        <div>
          <Slider />
        </div>
      </Container>
    </div>
  );
};

export default Home;
