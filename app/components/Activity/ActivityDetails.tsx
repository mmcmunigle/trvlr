// import { ExternalLink, MapPin, Star } from 'tabler-icons-react';
import { IconExternalLink, IconMapPin, IconStar } from '@tabler/icons-react';
import { Badge, Button, Card, Divider, Grid, Group, Image, Text, Title } from '@mantine/core';

const ActivityDetails = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {/* Title Section */}
        <Group justify="space-between">
          <Title order={2}>Coves d'Artà</Title>
          <Badge color="gray" radius="sm" size="lg">
            Attraction
          </Badge>
        </Group>
        <Group gap="xs">
          <IconStar size={16} color="gold" />
          <Text size="sm" c="dimmed">
            4.7 • 6.5k reviews • Canyamel, Illes Balears
          </Text>
        </Group>

        {/* Images Section */}
        <Grid mt="md">
          <Grid.Col span={6}>
            <Image
              src="https://yourimageurl.com/main.jpg"
              height={300}
              alt="Coves d'Arta main"
              radius="md"
              //   withPlaceholder
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Grid>
              <Grid.Col span={6}>
                <Image
                  src="https://yourimageurl.com/image1.jpg"
                  height={140}
                  alt="Cove Image 1"
                  radius="md"
                  //   withPlaceholder
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  src="https://yourimageurl.com/image2.jpg"
                  height={140}
                  alt="Cove Image 2"
                  radius="md"
                  //   withPlaceholder
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  src="https://yourimageurl.com/image3.jpg"
                  height={140}
                  alt="Cove Image 3"
                  radius="md"
                  //   withPlaceholder
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  src="https://yourimageurl.com/image4.jpg"
                  height={140}
                  alt="Cove Image 4"
                  radius="md"
                  //   withPlaceholder
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        {/* Overview Section */}
        <Divider my="md" />
        <Title order={4}>Overview</Title>
        <Text size="sm" mt="xs">
          The Coves d'Artà, nestled in the picturesque town of Canyamel in Majorca, Spain, are a
          natural wonder that captivates visitors with their stunning beauty. This extensive network
          of caves is renowned for its impressive stalactite and stalagmite formations, shaped over
          thousands of years. The caves are home to a variety of unique fauna, adding to their
          ecological significance.
        </Text>

        {/* Location and Date */}
        <Divider my="md" />
        <Group>
          <Group gap="xs">
            <IconMapPin size={18} />
            <Text size="sm">Canyamel, Illes Balears</Text>
          </Group>
          <Group>
            <Text size="sm">Date: Oct 16</Text>
            <Text size="sm">2 people</Text>
          </Group>
        </Group>

        {/* Action Buttons */}
        <Group mt="md" align="right">
          <Button
            component="a"
            href="https://example.com"
            target="_blank"
            leftSection={<IconExternalLink size={18} />}
          >
            Visit website
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default ActivityDetails;
