<template>
  <section
    v-if="!$route.query.filter"
    class="container">
    <h2
      class="page__heading">
      {{ params.heading }}
    </h2>
    <p
      class="page__description"
      v-html="params.about"
    />
    <ul>
      <li
        v-for="(section, i) in params.content"
        :key="i">
        <h3>
          {{ section.title }}
        </h3>
        <ul>
          <li
            v-for="(item, j) in section.list"
            :key="i + '.' + j">
            <p>
              {{ item }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
