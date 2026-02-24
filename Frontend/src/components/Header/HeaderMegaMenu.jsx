import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconHeart,
} from "@tabler/icons-react";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
  Menu,
  Popover,
  ActionIcon,
  Flex,
  Indicator,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import classes from "./HeaderMegaMenu.module.css";
import { Context } from "../../App";
const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HeaderMegaMenu() {
  const ctx = useContext(Context);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [searchOpened, { toggle: toggleSearch }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const handleSearch = (val) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(null);
    }
    let timeout = setTimeout(() => {
      ctx.setSearch(val);
    }, 500);
    setSearchTimeout(timeout);
  };

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <div
            style={{ fontSize: "24px", color: "#034657", fontWeight: "bold" }}
          >
            BETALİVA
          </div>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link} onClick={() => navigate("/")}>
              Home
            </a>
            <a
              href="#"
              className={classes.link}
              onClick={() => navigate("/products")}
            >
              Products
            </a>
            <a
              href="#"
              className={classes.link}
              onClick={() => navigate("/about")}
            >
              About
            </a>
            <a className={classes.link} onClick={() => navigate("/contact")}>
              Contact
            </a>
            <a
              className={classes.link}
              onClick={() => {
                if (!ctx.user) {
                  notifications.show({
                    title: "Yönetici Girişi Gerekli",
                    message: "Admin paneline erişmek için lütfen yönetici hesabınızla giriş yapın.",
                    color: "orange",
                  });
                  navigate("/login");
                } else if (ctx.user.role !== "admin") {
                  notifications.show({
                    title: "Yetkisiz Erişim",
                    message: "Bu alana sadece yöneticiler erişebilir.",
                    color: "red",
                  });
                } else {
                  navigate("/admin");
                }
              }}
            >
              Admin Panel
            </a>
          </Group>

          <Group visibleFrom="sm" gap="md">
            {/* Search Icon */}
            <ActionIcon size="lg" variant="transparent" onClick={toggleSearch}>
              <IconSearch size={24} color="white" />
            </ActionIcon>
            {/* Search Input */}
            {searchOpened && (
              <TextInput
                placeholder="Arama yapın..."
                icon={<IconSearch size={16} />}
                size="sm"
                onInput={(e) => {
                  handleSearch(e.target.value);
                }}
                className={classes.searchInput}
              />
            )}
            {/* Heart Icon */}
            <Indicator
              label={ctx.favorites.length}
              size={16}
              offset={5}
              disabled={ctx.favorites.length === 0}
              color="pink"
            >
              <ActionIcon
                size="lg"
                variant="transparent"
                color="white"
                onClick={() => navigate("/favorites")}
              >
                <IconHeart size={24} />
              </ActionIcon>
            </Indicator>
            {/* Cart Icon*/}
            <Popover opened={opened} onChange={setOpened}>
              <Popover.Target>
                <Indicator
                  label={ctx.basket.length}
                  size={16}
                  offset={5}
                  disabled={ctx.basket.length === 0}
                  color="red"
                >
                  <ActionIcon
                    size="lg"
                    variant="transparent"
                    onClick={(e) => setOpened(!opened)}
                    color="white"
                  >
                    <IconShoppingCart size={24} />
                  </ActionIcon>
                </Indicator>
              </Popover.Target>
              <Popover.Dropdown>
                <div className={classes.productList}>
                  {ctx.basket.length > 0
                    ? ctx.basket.map((item) => (
                      <div className={classes.productListItem}>
                        <img
                          src={"http://localhost:3000" + item.productImage}
                          width={50}
                          alt={item.productName}
                        />
                        <div>{item.productName}</div>
                        <div>
                          ${item.price} x {item.quantity}
                        </div>
                      </div>
                    ))
                    : "Hiç Ürün Eklemediniz"}
                  <Flex gap={20} pt={20}>
                    <Button
                      w={"100%"}
                      color="red"
                      onClick={(e) => ctx.setBasket([])}
                    >
                      Clear
                    </Button>
                    <Button
                      w={"100%"}
                      disabled={ctx.basket.length == 0}
                      onClick={(e) => navigate("/my-cart")}
                    >
                      My Cart
                    </Button>
                  </Flex>
                </div>
              </Popover.Dropdown>
            </Popover>

            {/* Profile Icon with Dropdown*/}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon size="lg" variant="transparent" color="white">
                  <IconUser size={24} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {ctx.user ? (
                  <>
                    <Menu.Label>Hesabım ({ctx.user.username})</Menu.Label>
                    <Menu.Item onClick={() => navigate("/profile")}>
                      Profilim
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      onClick={() => {
                        ctx.logout();
                        navigate("/");
                        notifications.show({
                          title: "Başarılı",
                          message: "Çıkış yapıldı.",
                          color: "blue",
                        });
                      }}
                    >
                      Çıkış Yap
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item onClick={() => navigate("/login")}>
                      Giriş Yap
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate("/register")}>
                      Kayıt Ol
                    </Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Products
          </a>
          <a href="#" className={classes.link}>
            About
          </a>
          <a href="#" className={classes.link}>
            Contact
          </a>
          <a href="#" className={classes.link}>
            Admin Panel
          </a>
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
