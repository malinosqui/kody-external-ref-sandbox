File: .cursor/rules/handling-time-safely.mdc

Content:
---
description: Critical timezone and time assumption rules - never assume current timezone or local system time for correct behavior
globs: []
alwaysApply: true
# @kody-sync  severity: critical
---

# Timezone Safety Rules

Use `Clock` injection and explicit timezones to prevent flaky tests and production bugs. Never rely on system default time or timezone.

## Critical: No Timezone Assumptions

Never assume current timezone or local system time for correct behavior. Always use explicit timezone handling for correct behavior across different environments.

### Key Principles

1. **Don't rely on local system time** - Even if you believe the system is configured to UTC, use `ZoneId.of("UTC")` explicitly
2. **Choose timezone based on context**:
   - **UTC** - Default for most business logic, database storage, and inter-service communication
   - **User timezone** - Pass from client/user preferences when displaying times or scheduling user-facing events
   - **Fixed timezone** - Only hard-code when coordinating with another system that uses a fixed timezone (e.g., "America/Sao_Paulo" if matching a legacy system in Brazil)
3. **Avoid bare time representations** - Don't pass "hour number" or "14:30" without clear timezone context. Use `ZonedDateTime` or document timezone assumptions
4. **Cross-system contracts** - When passing times between systems, establish clear contracts about timezone interpretation (prefer ISO-8601 with timezone offset)

### Prohibited Patterns

**Static now() methods** (use Clock injection instead):
- `LocalDateTime.now()`, `Instant.now()`, `ZonedDateTime.now()`, `OffsetDateTime.now()`
- `System.currentTimeMillis()`, `new Date()`, `Calendar.getInstance()`
- `new Timestamp(...)`, `new java.sql.Date(...)`, `new java.sql.Time(...)`

**System default timezone** (use explicit timezone instead):
- `Clock.systemDefaultZone()`, `TimeZone.getDefault()`, `ZoneId.systemDefault()`

### Recommended Patterns

```java
// Best: Use Clock injection (enables mocking in tests)
@Inject private Clock clock;

Instant.now(clock)
ZonedDateTime.now(clock)
LocalDateTime.now(clock)  // Usually want ZonedDateTime instead

// When Clock not available: explicit timezone
ZonedDateTime.now(ZoneId.of("UTC"))
ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"))
```

### Clock Configuration

Create a `Clock` bean configuration for your application module (see `implementation/business/src/main/java/br/com/quintoandar/config/ClockConfig.java`):

```java
@Configuration
public class ClockConfig {{
    @Bean
    public Clock clock() {{
        return Clock.systemDefaultZone();  // or Clock.systemUTC()
    }}
}}
```

Then inject `Clock` in your services/controllers for deterministic time handling that can be mocked in tests.

## Test Flakiness Prevention

Many time-related patterns cause flaky tests due to non-deterministic behavior. Use `Clock` injection for testable, deterministic time handling.

### Testing with Clock

Use test doubles to control time in tests for deterministic behavior:

**Simple fixed time** (using `Clock.fixed`):
```java
// Fixed time prevents flaky tests
Clock clock = Clock.fixed(Instant.parse("2021-08-01T00:00:00Z"), ZoneOffset.UTC);
TimeService service = new TimeService(clock);
// Test behavior with known time
```

**Advancing time** (custom fake for time-dependent logic):
```java
public class FakeClock extends Clock {{
    private Instant currentTime;
    private final ZoneId zone;

    public FakeClock(Instant currentTime, ZoneId zone) {{
        this.currentTime = currentTime;
        this.zone = zone;
    }}

    @Override
    public Instant instant() {{
        return currentTime;
    }}

    @Override
    public ZoneId getZone() {{
        return zone;
    }}

    @Override
    public Clock withZone(ZoneId zone) {{
        return new FakeClock(currentTime, zone);
    }}

    public void advance(Duration duration) {{
        currentTime = currentTime.plus(duration);
    }}
}}

// In test:
FakeClock clock = new FakeClock(Instant.parse("2021-08-01T00:00:00Z"), ZoneId.of("UTC"));
// ... test some behavior ...
clock.advance(Duration.ofHours(1)); // Advance time
// ... test behavior after time passes ...
```

### Real Examples

See these tests in the repository:
- `implementation/business/src/test/java/br/com/quintoandar/housedomain/services/HouseAvailabilityCheckAmplitudeEventServiceTest.java` (Clock.fixed with Instant.parse)
- `implementation/business/src/test/java/br/com/quintoandar/helper/DateUtils.java` (setFixedClockAt utility methods)
- `implementation/business/src/test/java/br/com/quintoandar/preferredfixedagent/PreferredFixedAgentScorerIT.java` (DateProvider mocking with fixed times)
- `implementation/business/src/test/java/br/com/quintoandar/contractdomain/ContractDatesServiceTest.java` (Clock injection in service tests)

**Good timezone handling examples:**
- `implementation/business/src/main/java/br/com/quintoandar/common/DateProviderJavaTimeBean.java` (explicit timezone constants and methods)
- `implementation/schedule-planner/src/main/java/br/com/quintoandar/planner/utils/DateTimeUtils.java` (explicit UTC timezone)
- `implementation/business/src/main/java/br/com/quintoandar/common/DateUtils.java` (timezone conversion utilities)

## Additional Resources

For deeper understanding of datetime handling best practices:
- [Common Mistakes in DateTime Formatting and Parsing](https://codeblog.jonskeet.uk/2015/05/05/common-mistakes-in-datetime-formatting-and-parsing/)
